// Medico Main Application Logic & Real-Time Local Database Manager
// Full Features: Auth System, Admin Portal with Real-Time Order Status Control, Dr. Bot Google AI Engine, Cart & Rx Scanner

class LocalStorageDB {
  constructor() {
    this.init();
  }

  init() {
    // 1. Initial Cart
    if (!localStorage.getItem("medico_cart")) {
      localStorage.setItem("medico_cart", JSON.stringify([]));
    }

    // 2. Initial Users DB
    const defaultUsers = [
      {
        id: "usr-1",
        name: "Sachin",
        phone: "9376199601",
        email: "sachin@example.com",
        address: "Suresh Nagar, Thatipur, Gwalior, Madhya Pradesh - 474011",
        password: "password@123"
      }
    ];

    if (!localStorage.getItem("medico_users_db") || localStorage.getItem("medico_users_db").includes("Suryansh")) {
      localStorage.setItem("medico_users_db", JSON.stringify(defaultUsers));
      localStorage.setItem("medico_current_user", JSON.stringify(defaultUsers[0]));
    }

    // 3. Current User Session
    if (!localStorage.getItem("medico_current_user")) {
      localStorage.setItem("medico_current_user", JSON.stringify(defaultUsers[0]));
    }

    // 4. Initial Orders
    if (!localStorage.getItem("medico_orders") || localStorage.getItem("medico_orders").includes("Suryansh")) {
      const initialOrders = [
        {
          id: "ORD-9428",
          date: "27/09/2026",
          customerName: "Sachin",
          customerPhone: "9376199601",
          items: [
            { id: "med-5", name: "Metformin 500mg SR", brand: "Generic", price: 16, mrp: 60, quantity: 2 },
            { id: "med-6", name: "Pantoprazole + Domperidone", brand: "Generic", price: 55, mrp: 220, quantity: 1 }
          ],
          totalAmount: 87,
          totalSavings: 253,
          status: "Pending",
          paymentMethod: "Cash on Delivery",
          address: "Suresh Nagar, Thatipur, Gwalior, MP - 474011"
        },
        {
          id: "ORD-8112",
          date: "25/09/2026",
          customerName: "Rahul Sharma",
          customerPhone: "+91 98111 22334",
          items: [
            { id: "med-4", name: "Paracetamol 650mg", brand: "Generic", price: 12, mrp: 38, quantity: 3 },
            { id: "med-7", name: "Montelukast + Levocetirizine", brand: "Generic", price: 58, mrp: 240, quantity: 1 }
          ],
          totalAmount: 94,
          totalSavings: 224,
          status: "Delivered",
          paymentMethod: "Cash on Delivery",
          address: "Sector 14, Huda Colony, Gurgaon, Haryana - 122001"
        }
      ];
      localStorage.setItem("medico_orders", JSON.stringify(initialOrders));
    }

    // 5. Prescriptions
    if (!localStorage.getItem("medico_prescriptions")) {
      localStorage.setItem("medico_prescriptions", JSON.stringify([]));
    }
  }

  // Cart Operations
  getCart() {
    return JSON.parse(localStorage.getItem("medico_cart") || "[]");
  }

  saveCart(cart) {
    localStorage.setItem("medico_cart", JSON.stringify(cart));
    updateCartUI();
  }

  addToCart(medId, qty = 1) {
    const med = MEDICINES_DATA.find(m => m.id === medId);
    if (!med) return;

    let cart = this.getCart();
    const existingIndex = cart.findIndex(item => item.id === medId);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += qty;
    } else {
      cart.push({
        id: med.id,
        name: med.name,
        genericName: med.genericName,
        brandName: med.brandName,
        genericPrice: med.genericPrice,
        brandPrice: med.brandPrice,
        mrp: med.mrp,
        quantity: qty,
        unit: med.unit
      });
    }

    this.saveCart(cart);
    showToast(`Added ${med.name} (Generic) to cart!`);
  }

  updateQuantity(medId, delta) {
    let cart = this.getCart();
    const index = cart.findIndex(item => item.id === medId);
    if (index > -1) {
      cart[index].quantity += delta;
      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      }
      this.saveCart(cart);
    }
  }

  clearCart() {
    this.saveCart([]);
  }

  // Orders Management
  getOrders() {
    return JSON.parse(localStorage.getItem("medico_orders") || "[]");
  }

  createOrder(orderData) {
    let orders = this.getOrders();
    orders.unshift(orderData);
    localStorage.setItem("medico_orders", JSON.stringify(orders));
    this.clearCart();
    renderDashboard();
    return orderData;
  }

  updateOrderStatus(orderId, newStatus) {
    let orders = this.getOrders();
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx > -1) {
      orders[idx].status = newStatus;
      localStorage.setItem("medico_orders", JSON.stringify(orders));
      renderDashboard(); // Updates customer dashboard
      return true;
    }
    return false;
  }

  // User Auth Operations
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("medico_current_user") || "null");
  }

  setCurrentUser(user) {
    if (user) {
      localStorage.setItem("medico_current_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("medico_current_user");
    }
    updateAuthHeaderUI();
  }

  getUsersDB() {
    return JSON.parse(localStorage.getItem("medico_users_db") || "[]");
  }

  registerUser(userData) {
    let users = this.getUsersDB();
    const exists = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (exists) return { success: false, message: "Email already registered!" };

    users.push(userData);
    localStorage.setItem("medico_users_db", JSON.stringify(users));
    this.setCurrentUser(userData);
    return { success: true, user: userData };
  }

  authenticateUser(email, password) {
    const users = this.getUsersDB();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (user) {
      this.setCurrentUser(user);
      return { success: true, user };
    }
    return { success: false, message: "Invalid email or password!" };
  }

  // User-Specific Orders (ONLY logged in user sees their own orders)
  getUserOrders(user = this.getCurrentUser()) {
    if (!user) return [];
    const allOrders = this.getOrders();
    const userEmail = (user.email || "").toLowerCase().trim();
    const userName = (user.name || "").toLowerCase().trim();
    const userPhone = (user.phone || "").replace(/\D/g, "");

    return allOrders.filter(order => {
      const ordEmail = (order.userEmail || "").toLowerCase().trim();
      const ordCustName = (order.customerName || "").toLowerCase().trim();
      const ordPhone = (order.customerPhone || order.address || "").replace(/\D/g, "");

      if (ordEmail && ordEmail === userEmail) return true;
      if (order.userId && user.id && order.userId === user.id) return true;
      if (userPhone && ordPhone && (ordPhone.includes(userPhone) || userPhone.includes(ordPhone))) return true;
      if (userName && ordCustName && ordCustName.includes(userName.split(" ")[0])) return true;
      return false;
    });
  }

  // Statistics for current user ONLY
  getUserStats(user = this.getCurrentUser()) {
    const orders = this.getUserOrders(user);
    let totalSpent = 0;
    let totalSaved = 0;

    orders.forEach(order => {
      if (order.status !== "Cancelled") {
        totalSpent += order.totalAmount || 0;
      }
      totalSaved += order.totalSavings || 0;
    });

    return {
      ordersCount: orders.length,
      prescriptionsCount: orders.length > 0 ? 1 : 0,
      totalSpent: Math.round(totalSpent),
      totalSaved: Math.round(totalSaved)
    };
  }

  // All-time System Statistics (Used by Admin)
  getStats() {
    const orders = this.getOrders();
    let totalSpent = 0;
    let totalSaved = 0;

    orders.forEach(order => {
      totalSpent += order.totalAmount || 0;
      totalSaved += order.totalSavings || 0;
    });

    return {
      ordersCount: orders.length,
      prescriptionsCount: 2,
      totalSpent: Math.round(totalSpent),
      totalSaved: Math.round(totalSaved)
    };
  }
}

// Global DB Instance
const db = new LocalStorageDB();

// Global App State
let currentCategory = "All";
let searchQuery = "";
let currentAdminFilter = "All";

// DOM Ready Initialization
document.addEventListener("DOMContentLoaded", () => {
  renderMedicines();
  updateCartUI();
  renderDashboard();
  updateAuthHeaderUI();
  setupEventListeners();
  loadSampleRx(SAMPLE_PRESCRIPTIONS[0]);
});

function setupEventListeners() {
  // Category Filtering
  document.querySelectorAll(".category-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".category-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentCategory = tab.dataset.category;
      renderMedicines();
    });
  });

  // Search Input
  const searchInput = document.getElementById("mainSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase();
      renderMedicines();
    });
  }

  // Quick Chips
  document.querySelectorAll(".chip-pill").forEach(chip => {
    chip.addEventListener("click", () => {
      const q = chip.dataset.search || chip.textContent.trim();
      searchHint(q);
    });
  });

  // Navigation Links

  document.querySelectorAll(".nav-item").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelectorAll(".nav-item").forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      const target = link.dataset.target;
      if (target === "home") window.scrollTo({ top: 0, behavior: "smooth" });
      else if (target === "medicines") document.getElementById("medicinesSection").scrollIntoView({ behavior: "smooth" });
      else if (target === "rx") document.getElementById("rxScannerSection").scrollIntoView({ behavior: "smooth" });
      else if (target === "drbot") openDrBot();
      else if (target === "dashboard") document.getElementById("dashboardSection").scrollIntoView({ behavior: "smooth" });
    });
  });

  // Rx Upload Dropzone
  const rxInput = document.getElementById("prescriptionFileInput");
  if (rxInput) rxInput.addEventListener("change", handleRxFileUpload);

  // Bot Input Enter Key
  const botInput = document.getElementById("botUserInput");
  if (botInput) {
    botInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") sendBotMessage();
    });
  }
}

function searchHint(q) {
  const searchInput = document.getElementById("mainSearchInput");
  if (searchInput) searchInput.value = q;
  searchQuery = q.toLowerCase();
  renderMedicines();
  document.getElementById("medicinesSection").scrollIntoView({ behavior: "smooth" });
}

// -------------------------------------------------------------
// MOBILE & TABLET NAVIGATION DRAWER
// -------------------------------------------------------------
function toggleMobileMenu() {
  const drawer = document.getElementById("mobileMenuDrawer");
  const backdrop = document.getElementById("mobileMenuBackdrop");
  if (drawer && backdrop) {
    const isOpen = drawer.classList.toggle("open");
    backdrop.classList.toggle("open", isOpen);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
}

function mobileNavigate(target) {
  toggleMobileMenu();
  setTimeout(() => {
    if (target === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (target === "medicines") {
      const el = document.getElementById("medicinesSection");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else if (target === "rx") {
      const el = document.getElementById("rxScannerSection");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else if (target === "drbot") {
      openDrBot();
    } else if (target === "dashboard") {
      const el = document.getElementById("dashboardSection");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, 220);
}

// -------------------------------------------------------------
// USER AUTHENTICATION & PROFILE
// -------------------------------------------------------------
function updateAuthHeaderUI() {
  const user = db.getCurrentUser();
  const authBtn = document.getElementById("headerAuthBtn");
  const mobileUserName = document.getElementById("mobileUserName");
  const mobileUserPhone = document.getElementById("mobileUserPhone");

  if (mobileUserName && mobileUserPhone) {
    if (user) {
      mobileUserName.textContent = user.name;
      mobileUserPhone.textContent = user.phone ? `+91 ${user.phone.replace("+91", "").trim()}` : "Active User";
    } else {
      mobileUserName.textContent = "Guest User";
      mobileUserPhone.textContent = "Tap to Login / Sign Up";
    }
  }

  if (!authBtn) return;

  if (user) {
    authBtn.innerHTML = `
      <span>👤 ${user.name.split(" ")[0]}</span>
      <small style="color: #ef4444; font-size: 0.72rem; margin-left: 4px;" onclick="logoutUser(event)">[Logout]</small>
    `;
    authBtn.onclick = null;
  } else {
    authBtn.innerHTML = `<span>👤 Login / Sign Up</span>`;
    authBtn.onclick = openAuthModal;
  }
}

function openAuthModal() {
  document.getElementById("authModal").classList.add("open");
  switchAuthTab("signin");
}

function closeAuthModal() {
  document.getElementById("authModal").classList.remove("open");
}

function switchAuthTab(tab) {
  const tabIn = document.getElementById("tabSignIn");
  const tabUp = document.getElementById("tabSignUp");
  const formIn = document.getElementById("signInForm");
  const formUp = document.getElementById("signUpForm");
  const title = document.getElementById("authModalTitle");

  if (tab === "signin") {
    tabIn.classList.add("active");
    tabUp.classList.remove("active");
    formIn.style.display = "block";
    formUp.style.display = "none";
    title.textContent = "Welcome Back to Medico";
  } else {
    tabUp.classList.add("active");
    tabIn.classList.remove("active");
    formIn.style.display = "none";
    formUp.style.display = "block";
    title.textContent = "Create Free Medico Account";
  }
}

function handleUserSignIn(e) {
  e.preventDefault();
  const email = document.getElementById("signInEmail").value.trim();
  const pass = document.getElementById("signInPassword").value.trim();

  const res = db.authenticateUser(email, pass);
  if (res.success) {
    closeAuthModal();
    renderDashboard();
    showToast(`Welcome back, ${res.user.name}!`);
  } else {
    showToast(`❌ ${res.message}`);
  }
}

function handleUserSignUp(e) {
  e.preventDefault();
  const name = document.getElementById("signUpName").value.trim();
  const phone = document.getElementById("signUpPhone").value.trim();
  const email = document.getElementById("signUpEmail").value.trim();
  const address = document.getElementById("signUpAddress").value.trim();
  const password = document.getElementById("signUpPassword").value.trim();

  const newUser = {
    id: `usr-${Date.now()}`,
    name,
    phone,
    email,
    address,
    password
  };

  const res = db.registerUser(newUser);
  if (res.success) {
    closeAuthModal();
    renderDashboard();
    showToast(`🎉 Account created! Welcome, ${newUser.name}!`);
  } else {
    showToast(`❌ ${res.message}`);
  }
}

function logoutUser(e) {
  if (e) e.stopPropagation();
  db.setCurrentUser(null);
  renderDashboard();
  showToast("Logged out successfully.");
}

// -------------------------------------------------------------
// ADMIN PORTAL & REAL-TIME LOGISTICS CONTROL
// -------------------------------------------------------------
function openAdminLoginModal() {
  document.getElementById("adminLoginModal").classList.add("open");
}

function closeAdminLoginModal() {
  document.getElementById("adminLoginModal").classList.remove("open");
}

function handleAdminLogin(e) {
  e.preventDefault();
  const id = document.getElementById("adminLoginId").value.trim().toLowerCase();
  const pass = document.getElementById("adminLoginPass").value.trim();

  // Secure Admin Credentials Check
  if ((id === "admin@medico.com" || id === "admin") && pass === "admin123") {
    closeAdminLoginModal();
    enterAdminPortal();
  } else {
    showToast("❌ Access Denied: Invalid Admin ID or Password!");
  }
}

function enterAdminPortal() {
  document.getElementById("storeFrontView").style.display = "none";
  document.getElementById("adminPortalView").style.display = "block";
  window.scrollTo({ top: 0, behavior: "smooth" });
  renderAdminDashboard();
  showToast("🔐 Welcome Admin: Real-time control active.");
}

function exitAdminPortal() {
  document.getElementById("adminPortalView").style.display = "none";
  document.getElementById("storeFrontView").style.display = "block";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderAdminDashboard(filterStatus = currentAdminFilter) {
  const orders = db.getOrders();

  // Calculate KPIs
  const total = orders.length;
  const pending = orders.filter(o => o.status === "Pending").length;
  const shipped = orders.filter(o => o.status === "Shipped" || o.status === "Processing").length;
  const delivered = orders.filter(o => o.status === "Delivered").length;
  const cancelled = orders.filter(o => o.status === "Cancelled").length;
  const grossSales = orders.reduce((sum, o) => sum + (o.status !== "Cancelled" ? o.totalAmount : 0), 0);

  document.getElementById("adminKpiTotal").textContent = total;
  document.getElementById("adminKpiPending").textContent = pending;
  document.getElementById("adminKpiShipped").textContent = shipped;
  document.getElementById("adminKpiDelivered").textContent = delivered;
  document.getElementById("adminKpiCancelled").textContent = cancelled;
  document.getElementById("adminKpiRevenue").textContent = `₹${grossSales}`;

  // Filter Table
  const filteredOrders = filterStatus === "All" ? orders : orders.filter(o => o.status === filterStatus);
  const tableBody = document.getElementById("adminOrdersTableBody");
  if (!tableBody) return;

  if (filteredOrders.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: #94a3b8; padding: 24px;">No orders found matching status: "${filterStatus}".</td></tr>`;
    return;
  }

  tableBody.innerHTML = filteredOrders.map(ord => {
    const medList = ord.items.map(i => `<span style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; margin-right: 4px; display: inline-block; font-size: 0.75rem;">${i.name} (x${i.quantity})</span>`).join("");
    
    // Status Badge Class
    let badgeClass = "status-pending";
    if (ord.status === "Shipped") badgeClass = "status-shipped";
    else if (ord.status === "Processing") badgeClass = "status-processing";
    else if (ord.status === "Delivered") badgeClass = "status-confirmed";
    else if (ord.status === "Cancelled") badgeClass = "status-cancelled";

    return `
      <tr>
        <td><strong style="color: #38bdf8;">#${ord.id}</strong></td>
        <td>${ord.date}</td>
        <td>
          <div style="font-weight: 700; color: white;">${ord.customerName || "Customer"}</div>
          <small style="color: #94a3b8;">${ord.customerPhone || ""}</small><br>
          <small style="color: #cbd5e1; max-width: 200px; display: inline-block;">${ord.address || ""}</small>
        </td>
        <td style="max-width: 250px;">${medList}</td>
        <td><strong style="color: #34d399;">₹${ord.totalAmount}</strong><br><small style="color: #94a3b8;">(${ord.paymentMethod})</small></td>
        <td>
          <span class="status-badge ${badgeClass}">${ord.status}</span>
        </td>
        <td>
          <select class="admin-status-select" onchange="changeOrderStatusFromAdmin('${ord.id}', this.value)">
            <option value="Pending" ${ord.status === "Pending" ? "selected" : ""}>⏳ Pending</option>
            <option value="Processing" ${ord.status === "Processing" ? "selected" : ""}>⚙️ Processing</option>
            <option value="Shipped" ${ord.status === "Shipped" ? "selected" : ""}>🚚 Shipped</option>
            <option value="Delivered" ${ord.status === "Delivered" ? "selected" : ""}>✅ Delivered</option>
            <option value="Cancelled" ${ord.status === "Cancelled" ? "selected" : ""}>❌ Cancelled</option>
          </select>
        </td>
      </tr>
    `;
  }).join("");
}

function filterAdminOrders(status, btn) {
  currentAdminFilter = status;
  document.querySelectorAll(".admin-filter-btn").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
  renderAdminDashboard(status);
}

function changeOrderStatusFromAdmin(orderId, newStatus) {
  const success = db.updateOrderStatus(orderId, newStatus);
  if (success) {
    renderAdminDashboard();
    showToast(`Order #${orderId} status updated to: ${newStatus}`);
  }
}

// -------------------------------------------------------------
// MEDICINES RENDERING & COMPARISON
// -------------------------------------------------------------
function renderMedicines() {
  const container = document.getElementById("medicinesGrid");
  if (!container) return;

  const filtered = MEDICINES_DATA.filter(med => {
    const matchesCategory = currentCategory === "All" || med.category === currentCategory;
    const matchesSearch = !searchQuery || 
      med.name.toLowerCase().includes(searchQuery) ||
      med.genericName.toLowerCase().includes(searchQuery) ||
      med.brandName.toLowerCase().includes(searchQuery) ||
      med.categoryLabel.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; background: white; border-radius: 12px;">
        <p style="font-size: 1.1rem; color: #64748b;">No medicines found matching "<strong>${searchQuery}</strong>".</p>
        <button onclick="resetSearch()" class="btn-secondary" style="margin: 14px auto;">Show All Medicines</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(med => {
    return `
      <div class="glass-card medicine-card">
        <div>
          <div class="medicine-card-top">
            <span class="category-badge">${med.categoryLabel}</span>
            <span class="savings-tag">Save ${med.savingsPercent}% OFF</span>
          </div>

          <h3 class="medicine-name">${med.name}</h3>
          <p class="medicine-composition">${med.composition}</p>

          <div class="comparison-box">
            <div class="comp-brand">
              <span class="comp-label">Branded (${med.brandName.split('/')[0]})</span>
              <span class="brand-price">₹${med.mrp.toFixed(2)}</span>
            </div>
            <div style="font-size: 1.2rem; color: #10b981; font-weight: 800;">➔</div>
            <div class="comp-generic">
              <span class="comp-label">Generic Alternative</span>
              <span class="generic-price">₹${med.genericPrice.toFixed(2)}</span>
            </div>
          </div>

          <div class="medicine-dosage-preview">
            <strong>⏰ Kab leni hai:</strong> ${med.dosageInfo.timing}<br>
            <strong>🔄 Frequency:</strong> ${med.dosageInfo.frequency}
          </div>
        </div>

        <div class="medicine-card-actions">
          <button class="btn-add-cart" onclick="db.addToCart('${med.id}')">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            Add Generic to Cart
          </button>
          <button class="btn-info-quick" title="Ask Dr. Bot about this medicine" onclick="askDrBotAbout('${med.name}')">
            💬
          </button>
        </div>
      </div>
    `;
  }).join("");
}

function resetSearch() {
  searchQuery = "";
  currentCategory = "All";
  const input = document.getElementById("mainSearchInput");
  if (input) input.value = "";
  document.querySelectorAll(".category-tab").forEach(t => t.classList.remove("active"));
  document.querySelector(".category-tab[data-category='All']").classList.add("active");
  renderMedicines();
}

// -------------------------------------------------------------
// PRESCRIPTION SCANNER (OCR & DOCTOR HANDWRITING RECOGNITION)
// -------------------------------------------------------------
function triggerRxReupload() {
  const dropzone = document.getElementById("rxUploadDropzone");
  const previewCard = document.getElementById("rxImagePreviewCard");
  const backLink = document.getElementById("rxBackToPreviewLink");
  const fileInput = document.getElementById("prescriptionFileInput");

  if (previewCard) previewCard.style.display = "none";
  if (dropzone) dropzone.style.display = "flex";
  if (backLink) backLink.style.display = "block";

  if (fileInput) fileInput.click();
}

function showActivePreviewView() {
  const dropzone = document.getElementById("rxUploadDropzone");
  const previewCard = document.getElementById("rxImagePreviewCard");
  if (dropzone) dropzone.style.display = "none";
  if (previewCard) previewCard.style.display = "block";
}

function renderActivePrescriptionPreview(activeRx) {
  const dropzone = document.getElementById("rxUploadDropzone");
  const previewCard = document.getElementById("rxImagePreviewCard");
  const displayWrapper = document.getElementById("rxImageDisplayWrapper");

  if (!previewCard || !displayWrapper) return;

  if (dropzone) dropzone.style.display = "none";
  previewCard.style.display = "block";

  if (activeRx.imageSrc) {
    displayWrapper.innerHTML = `
      <div class="rx-uploaded-img-wrapper">
        <img src="${activeRx.imageSrc}" class="rx-uploaded-img" alt="Uploaded Prescription Image">
      </div>
      <div style="margin-top: 8px; font-size: 0.8rem; color: #334155; display: flex; justify-content: space-between; align-items: center;">
        <span><strong>📄 Scanned Rx:</strong> ${activeRx.fileName || "Prescription Photo"}</span>
        <span style="color: #059669; font-weight: 700;">✓ Digitized</span>
      </div>
    `;
  } else {
    displayWrapper.innerHTML = `
      <div class="rx-doc-slip">
        <div class="rx-doc-header">
          <h4>${activeRx.doctorName || "Dr. Rajesh Sharma"}</h4>
          <span>${activeRx.hospital || "City Care Clinic"} • Reg: MP-24867</span>
          <div style="margin-top: 4px; font-size: 0.78rem; color: #0284c7; font-weight: 700;">
            👤 Patient: ${activeRx.patientName || "Sachin"} (${activeRx.ageGender || "22/M"}) | 🗓️ Date: ${activeRx.date || "28/09/2026"}
          </div>
          <div style="font-size: 0.76rem; color: #475569; margin-top: 2px;">
            <strong>Diagnosis:</strong> ${activeRx.diagnosis}
          </div>
        </div>
        <div style="font-weight: 800; color: #059669; font-size: 0.82rem; margin-bottom: 4px;">Rx (Doctor Handwritten Notes):</div>
        <div style="font-family: monospace; font-size: 0.78rem; line-height: 1.6; color: #1e293b; background: rgba(255,255,255,0.7); padding: 8px; border-radius: 6px; border: 1px solid #fde68a;">
          ${(activeRx.rawText.includes("Rx") ? activeRx.rawText.split("Rx")[1] : activeRx.rawText).trim()}
        </div>
      </div>
    `;
  }
}

function loadSampleRx(sample) {
  const preview = document.getElementById("rxScanDisplay");
  const extractedTextBox = document.getElementById("extractedTextDisplay");
  const chipsContainer = document.getElementById("detectedKeywordsDisplay");
  const matchedContainer = document.getElementById("rxMatchedMedicinesList");
  const countBadge = document.getElementById("rxMatchCountBadge");
  const actionBanner = document.getElementById("rxActionBanner");

  preview.classList.add("scanning");
  extractedTextBox.textContent = "AI OCR & Doctor Handwriting Scanner: Analyzing doctor cursive handwriting, clinical shorthand (OD, BD, TDS, HS, SOS) and medication strengths...";
  chipsContainer.innerHTML = `<span style="font-size: 0.8rem; color: #94a3b8;">Digitizing medical entities...</span>`;

  // Save active prescription in LocalStorage & render preview
  localStorage.setItem("medico_active_prescription", JSON.stringify(sample));
  renderActivePrescriptionPreview(sample);

  setTimeout(() => {
    preview.classList.remove("scanning");
    extractedTextBox.textContent = sample.rawText;
    
    chipsContainer.innerHTML = sample.keywords.map(kw => `
      <span class="detected-chip">${kw}</span>
    `).join("");

    const matchedMeds = MEDICINES_DATA.filter(m => sample.matchedMedicineIds.includes(m.id));
    countBadge.textContent = `${matchedMeds.length} Generic Medicines Matched`;

    const { totalMrp, totalGeneric, savingsAmount, savingsPercent } = calculateSavings(matchedMeds);

    // Show Action Banner
    if (actionBanner) {
      actionBanner.style.display = "flex";
      const savingsTitle = document.getElementById("rxBannerSavingsTitle");
      const savingsSub = document.getElementById("rxBannerSubTitle");
      if (savingsTitle) savingsTitle.textContent = `🎉 You Save ₹${savingsAmount} (${savingsPercent}%) on this prescription`;
      if (savingsSub) savingsSub.textContent = `Branded MRP: ₹${totalMrp} | Jan Aushadhi Generic Total: ₹${totalGeneric}`;
    }

    matchedContainer.innerHTML = matchedMeds.map(med => {
      // Find explanation item if available
      const exp = sample.itemsExplanation ? sample.itemsExplanation.find(i => i.name.toLowerCase().includes(med.name.toLowerCase().split(" ")[0])) : null;
      const purposeText = exp ? exp.purposeHindi : med.description;
      const timingText = exp ? `${exp.timingHindi} • ${exp.frequencyHindi}` : `${med.dosageInfo.timing} (${med.dosageInfo.frequency})`;

      return `
        <div class="rx-matched-med-card">
          <div class="rx-med-info">
            <h4>
              ${med.name}
              <span class="savings-tag">Save ${med.savingsPercent}%</span>
            </h4>
            <div class="med-hindi-purpose">
              🎯 ${purposeText}
            </div>
            <div class="med-timing-label">
              ⏰ ${timingText}
            </div>
            <div class="med-price-line">
              Branded (${med.brandName.split('/')[0]}): <del>₹${med.mrp}</del> | <strong>Generic (Jan Aushadhi): ₹${med.genericPrice}</strong>
            </div>
          </div>
          <button class="btn-primary" style="padding: 8px 18px; font-size: 0.85rem;" onclick="db.addToCart('${med.id}')">
            Add to Cart
          </button>
        </div>
      `;
    }).join("");

    showToast(`Prescription Scanned! ${matchedMeds.length} generic medicines matched (Save ₹${savingsAmount})`);
  }, 1000);
}

function handleRxFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const preview = document.getElementById("rxScanDisplay");
  const extractedTextBox = document.getElementById("extractedTextDisplay");
  const chipsContainer = document.getElementById("detectedKeywordsDisplay");

  preview.classList.add("scanning");
  extractedTextBox.textContent = `Reading uploaded prescription file: ${file.name}...\nRunning deep handwriting stroke recognition & medical dictionary matching...`;
  chipsContainer.innerHTML = `<span style="font-size: 0.8rem; color: #38bdf8;">Scanning neural image features...</span>`;

  const reader = new FileReader();
  reader.onload = function(event) {
    const dataUrl = event.target.result;
    
    setTimeout(() => {
      // Check file name or match default realistic prescription
      const fname = file.name.toLowerCase();
      let chosenSample = SAMPLE_PRESCRIPTIONS[0]; // default Viral Fever
      if (fname.includes("sugar") || fname.includes("diabetes") || fname.includes("bp") || fname.includes("metformin")) {
        chosenSample = SAMPLE_PRESCRIPTIONS[1];
      } else if (fname.includes("pain") || fname.includes("bone") || fname.includes("ortho") || fname.includes("sprain") || fname.includes("zerodol")) {
        chosenSample = SAMPLE_PRESCRIPTIONS[2];
      }

      // Create dynamic activeRx with the user's uploaded image
      const activeRx = {
        ...chosenSample,
        id: "uploaded-" + Date.now(),
        fileName: file.name,
        imageSrc: dataUrl,
        date: new Date().toLocaleDateString("en-GB")
      };

      loadSampleRx(activeRx);
      showToast(`📸 Doctor Prescription Image Uploaded & Verified!`);
    }, 1200);
  };

  reader.readAsDataURL(file);
}

function addAllRxToCart() {
  let activeRx = null;
  try {
    const stored = localStorage.getItem("medico_active_prescription");
    if (stored) activeRx = JSON.parse(stored);
  } catch(e) {}

  if (!activeRx && typeof SAMPLE_PRESCRIPTIONS !== "undefined" && SAMPLE_PRESCRIPTIONS.length > 0) {
    activeRx = SAMPLE_PRESCRIPTIONS[0];
  }

  if (!activeRx || !activeRx.matchedMedicineIds) {
    showToast("Pehle koi prescription scan karein!");
    return;
  }

  activeRx.matchedMedicineIds.forEach(id => {
    db.addToCart(id, 1);
  });

  const matchedMeds = MEDICINES_DATA.filter(m => activeRx.matchedMedicineIds.includes(m.id));
  const { savingsAmount } = calculateSavings(matchedMeds);

  showToast(`🎉 Saari ${matchedMeds.length} generic dawaiyan cart me add ho gayi! ₹${savingsAmount} ki bachat hui!`);
  toggleCartDrawer();
}

function askDrBotAboutPrescription() {
  openDrBot();
  const input = document.getElementById("botUserInput");
  if (input) {
    input.value = "Prescription me konsi dwai or kya kya likha hai, aasan bhasha me samjhao";
    sendBotMessage();
  }
}

// -------------------------------------------------------------
// CART & COD CHECKOUT
// -------------------------------------------------------------
function toggleCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  const backdrop = document.getElementById("cartDrawerBackdrop");
  drawer.classList.toggle("open");
  backdrop.classList.toggle("open");
}

function updateCartUI() {
  const cart = db.getCart();
  const countBadge = document.getElementById("cartCountBadge");
  const itemsContainer = document.getElementById("cartItemsList");
  const subtotalEl = document.getElementById("cartSubtotal");
  const savingsEl = document.getElementById("cartSavings");
  const totalEl = document.getElementById("cartTotal");
  const celebrationBox = document.getElementById("savingsCelebrationText");

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (countBadge) countBadge.textContent = totalCount;
  const mobileCartBadge = document.getElementById("mobileMenuCartBadge");
  if (mobileCartBadge) mobileCartBadge.textContent = `${totalCount} item${totalCount === 1 ? '' : 's'}`;

  if (itemsContainer) {
    if (cart.length === 0) {
      itemsContainer.innerHTML = `
        <div style="text-align: center; padding: 40px 20px;">
          <div style="font-size: 3rem; margin-bottom: 10px;">🛒</div>
          <p style="font-size: 1rem; color: #64748b; font-weight: 600;">Aapka cart khali hai.</p>
          <p style="font-size: 0.85rem; color: #94a3b8;">Prescription scan karein ya medicines add karein aur 70% tak bachat karein.</p>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = "₹0.00";
      if (savingsEl) savingsEl.textContent = "-₹0.00";
      if (totalEl) totalEl.textContent = "₹0.00";
      if (celebrationBox) celebrationBox.textContent = "Order karo aur MRP par 70% tak bachao!";
      return;
    }

    const { totalMrp, totalGeneric, savingsAmount, savingsPercent } = calculateSavings(cart);

    itemsContainer.innerHTML = cart.map(item => `
      <div class="cart-item-row">
        <div class="cart-item-info">
          <strong>${item.name}</strong>
          <span>Generic • ₹${item.genericPrice.toFixed(2)} (MRP: <del>₹${item.mrp.toFixed(2)}</del>)</span>
        </div>
        <div class="cart-item-actions">
          <button class="qty-btn" onclick="db.updateQuantity('${item.id}', -1)">-</button>
          <span style="font-weight: 700; font-size: 0.9rem;">${item.quantity}</span>
          <button class="qty-btn" onclick="db.updateQuantity('${item.id}', 1)">+</button>
        </div>
      </div>
    `).join("");

    if (subtotalEl) subtotalEl.textContent = `₹${totalMrp.toFixed(2)}`;
    if (savingsEl) savingsEl.textContent = `-₹${savingsAmount.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `₹${totalGeneric.toFixed(2)}`;
    if (celebrationBox) {
      celebrationBox.textContent = `🎉 Badhai ho! Aap ₹${savingsAmount} (${savingsPercent}%) ki bachat kar rahe hain!`;
    }
  }
}

function openCheckoutModal() {
  const cart = db.getCart();
  if (cart.length === 0) {
    showToast("Pehle cart me koi dawaai add karein!");
    return;
  }
  toggleCartDrawer();
  const modal = document.getElementById("checkoutModal");
  modal.classList.add("open");

  // Autofill user details
  const user = db.getCurrentUser() || {};
  document.getElementById("custName").value = user.name || "";
  document.getElementById("custPhone").value = user.phone || "";
  document.getElementById("custAddress").value = user.address || "";
}

function closeCheckoutModal() {
  document.getElementById("checkoutModal").classList.remove("open");
}

function submitOrder(e) {
  e.preventDefault();
  const name = document.getElementById("custName").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const address = document.getElementById("custAddress").value.trim();

  if (!name || !phone || !address) {
    showToast("Kripya poora address aur phone number bharein!");
    return;
  }

  const cart = db.getCart();
  const { totalGeneric, savingsAmount } = calculateSavings(cart);
  const currentUser = db.getCurrentUser() || {};

  const newOrder = {
    id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    userId: currentUser.id || "usr-1",
    userEmail: currentUser.email || "sachin@example.com",
    date: new Date().toLocaleDateString("en-IN"),
    customerName: name,
    customerPhone: phone,
    items: cart,
    totalAmount: totalGeneric,
    totalSavings: savingsAmount,
    status: "Pending", // Real-time default status
    paymentMethod: "Cash on Delivery",
    address: `${address} (Phone: ${phone})`
  };

  db.createOrder(newOrder);
  closeCheckoutModal();
  showToast(`🎉 Order Placed Successfully! (Order ID: ${newOrder.id})`);
  document.getElementById("dashboardSection").scrollIntoView({ behavior: "smooth" });
}

// -------------------------------------------------------------
// DR. BOT ADVANCED CLINICAL MEDICAL ADVISOR
// -------------------------------------------------------------
function openDrBot() {
  document.getElementById("drbotModal").classList.add("open");
}

function closeDrBot() {
  document.getElementById("drbotModal").classList.remove("open");
}

function askDrBotAbout(medicineName) {
  openDrBot();
  const input = document.getElementById("botUserInput");
  input.value = `${medicineName} kab aur kaise leni hai?`;
  sendBotMessage();
}

function sendBotSuggestion(chipText) {
  const input = document.getElementById("botUserInput");
  input.value = chipText;
  sendBotMessage();
}

function sendBotMessage() {
  const input = document.getElementById("botUserInput");
  const query = input.value.trim();
  if (!query) return;

  const messagesContainer = document.getElementById("drbotMessages");

  // User Query Bubble
  const userBubble = document.createElement("div");
  userBubble.className = "user-msg";
  userBubble.textContent = query;
  messagesContainer.appendChild(userBubble);

  input.value = "";
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // Bot Thinking / Google Clinical Analysis Indicator
  const typingIndicator = document.createElement("div");
  typingIndicator.className = "bot-msg";
  typingIndicator.innerHTML = `
    <span style="display: flex; align-items: center; gap: 8px;">
      <span class="pulse-dot" style="display: inline-block;"></span>
      <strong>Dr. Bot AI:</strong> Analyzing symptoms via Google & Medical Knowledge Base...
    </span>
  `;
  messagesContainer.appendChild(typingIndicator);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  setTimeout(() => {
    messagesContainer.removeChild(typingIndicator);
    const result = drBot.processQuery(query);

    const botBubble = document.createElement("div");
    botBubble.className = "bot-msg";

    botBubble.innerHTML = `
      <div class="bot-analysis-banner">
        <strong>🔍 Google Clinical & Diagnostic Analysis:</strong><br>
        ${result.clinicalAnalysis}
      </div>

      <p style="font-weight: 800; color: #047857; margin-bottom: 6px; font-size: 0.95rem;">🩺 ${result.condition}</p>
      <p style="margin-bottom: 8px;">${result.summary}</p>

      <div class="bot-schedule-card">
        <strong style="font-size: 0.82rem; color: #065f46; display: block; margin-bottom: 6px;">📋 Dawaai Schedule & Timing Niyam:</strong>
        ${result.schedule.map(s => `
          <div class="bot-schedule-item">
            <span class="timing-badge">⏰ ${s.timing}</span>
            <span class="freq-badge">🔄 ${s.frequency}</span>
            <div style="font-weight: 700; font-size: 0.85rem; color: #0f172a; margin-top: 2px;">${s.medicine}</div>
            <div style="font-size: 0.78rem; color: #475569;">${s.purpose}</div>
          </div>
        `).join("")}
      </div>

      <div style="margin-top: 10px; font-size: 0.8rem; color: #334155; line-height: 1.4;">
        ${result.advice.map(a => `<p style="margin-bottom: 4px;">${a}</p>`).join("")}
      </div>

      ${result.homeCare ? `
        <div class="bot-homecare-box">
          <strong>🍵 Gharelu Nuskhe & Parhez (Home Care):</strong><br>
          ${result.homeCare}
        </div>
      ` : ""}

      ${result.recommendedMedIds && result.recommendedMedIds.length > 0 ? `
        <div style="margin-top: 14px; padding-top: 12px; border-top: 1px dashed #cbd5e1;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <span style="font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Direct Generic Equivalents:</span>
            ${result.isPrescriptionGuide ? `
              <button class="btn-primary" style="padding: 4px 12px; font-size: 0.76rem;" onclick="addAllRxToCart()">
                🛒 Add All to Cart
              </button>
            ` : ""}
          </div>
          ${result.recommendedMedIds.map(medId => {
            const med = MEDICINES_DATA.find(m => m.id === medId);
            if (!med) return "";
            return `
              <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 6px; background: white; padding: 6px 10px; border-radius: 6px; border: 1px solid #e2e8f0;">
                <div>
                  <span style="font-size: 0.82rem; font-weight: 700; display: block;">${med.name}</span>
                  <small style="color: #10b981; font-weight: 700;">Generic ₹${med.genericPrice} (Save ${med.savingsPercent}%)</small>
                </div>
                <button class="btn-primary" style="padding: 4px 10px; font-size: 0.75rem;" onclick="db.addToCart('${med.id}')">
                  Add to Cart
                </button>
              </div>
            `;
          }).join("")}
        </div>
      ` : ""}
    `;

    messagesContainer.appendChild(botBubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, 750);
}

// -------------------------------------------------------------
// USER DASHBOARD (REAL-TIME UPDATES)
// -------------------------------------------------------------
function renderDashboard() {
  const currentUser = db.getCurrentUser();
  const stats = db.getUserStats(currentUser);
  const orders = db.getUserOrders(currentUser);

  document.getElementById("dashTotalOrders").textContent = stats.ordersCount;
  document.getElementById("dashTotalRx").textContent = stats.prescriptionsCount;
  document.getElementById("dashTotalSpent").textContent = `₹${stats.totalSpent}`;
  document.getElementById("dashTotalSaved").textContent = `₹${stats.totalSaved}`;

  const tableBody = document.getElementById("dashboardOrdersTableBody");
  if (!tableBody) return;

  if (!currentUser) {
    tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #94a3b8; padding: 24px;">Please <a href="javascript:void(0)" onclick="openAuthModal()" style="color: #059669; font-weight: 700; text-decoration: underline;">Login or Sign Up</a> to view your personal orders.</td></tr>`;
    return;
  }

  if (orders.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #94a3b8; padding: 24px;">Aapka koi purana order nahi mila. Place an order to see it here!</td></tr>`;
    return;
  }

  tableBody.innerHTML = orders.map(ord => {
    const itemNames = ord.items.map(i => `${i.name} (x${i.quantity})`).join(", ");
    
    // Status Badge Class
    let badgeClass = "status-pending";
    if (ord.status === "Shipped") badgeClass = "status-shipped";
    else if (ord.status === "Processing") badgeClass = "status-processing";
    else if (ord.status === "Delivered") badgeClass = "status-confirmed";
    else if (ord.status === "Cancelled") badgeClass = "status-cancelled";

    return `
      <tr>
        <td><strong>#${ord.id}</strong></td>
        <td>${ord.date}</td>
        <td style="max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${itemNames}</td>
        <td><strong>₹${ord.totalAmount.toFixed(2)}</strong> <span style="font-size: 0.75rem; color: #16a34a;">(Saved ₹${ord.totalSavings})</span></td>
        <td><span class="status-badge ${badgeClass}">${ord.status}</span></td>
      </tr>
    `;
  }).join("");
}

// -------------------------------------------------------------
// TOAST NOTIFICATIONS
// -------------------------------------------------------------
function showToast(message) {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <svg width="20" height="20" fill="none" stroke="#22c55e" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (container.contains(toast)) container.removeChild(toast);
    }, 300);
  }, 3500);
}
