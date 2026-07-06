
let tabs = [];
let activeTabId = null;

const tabBar = document.getElementById("tabBar");
const contentArea = document.getElementById("contentArea");
const addTabBtn = document.getElementById("addTabBtn");
const tabCount = document.getElementById("tabCount");


function saveTabs() {
    localStorage.setItem("tabsData", JSON.stringify(tabs));
    localStorage.setItem("activeTabId", activeTabId);
}

function loadTabs() {
    const storedTabs = localStorage.getItem("tabsData");
    const storedActive = localStorage.getItem("activeTabId");
    if (storedTabs) {
        tabs = JSON.parse(storedTabs);
    } else {
        tabs = [{
            id: Date.now(),
            name: "Home",
            content: "<p>Welcome to the dashboard!</p>"
        }];
    }
    activeTabId = storedActive ? Number(storedActive) : tabs[0]?.id;
    renderTabs();
    if (tabs.length > 0) {
        switchTab(activeTabId || tabs[0].id);
    }
}


function addTab() {
    const newTabNumber = tabs.length + 1;
    const newTab = {
        id: Date.now(),
        name: `Tab ${newTabNumber}`,
        content: `<p>Content for Tab ${newTabNumber}</p>`
    };
    tabs.push(newTab);
    saveTabs();
    renderTabs();
    switchTab(newTab.id);
}


function renderTabs() {
    tabBar.innerHTML = "";
    contentArea.innerHTML = "";
    tabs.forEach(tab => {
        const tabBtn = document.createElement("div");
        tabBtn.classList.add("tab-btn");
        tabBtn.setAttribute("data-tab-id", tab.id);
        if (tab.id === activeTabId) {
            tabBtn.classList.add("active");
        }
        tabBtn.innerHTML = `
            <span class="tab-name">${tab.name}</span>
            <button class="rename-btn">✎</button>
            <button class="delete-btn">✗</button>
        `;
        tabBar.appendChild(tabBtn);
    });
    updateTabCount();
}


function switchTab(tabId) {
    const tab = tabs.find(t => t.id === tabId);
    if (!tab) return;
    activeTabId = tabId;
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.classList.remove("active");
        if (Number(btn.dataset.tabId) === tabId) {
            btn.classList.add("active");
        }
    });
    contentArea.innerHTML = tab.content;
    saveTabs();
}


function renameTab(tabId, newName) {
    const tab = tabs.find(t => t.id === tabId);
    if (!tab) return;
    if (!newName || newName.trim() === "") return;
    tab.name = newName.trim();
    saveTabs();
    renderTabs();
}


function deleteTab(tabId) {
    const wasActive = tabId === activeTabId;
    tabs = tabs.filter(t => t.id !== tabId);
    if (tabs.length === 0) {
        activeTabId = null;
        saveTabs();
        renderTabs();
        contentArea.innerHTML = "<p>No tabs available. Click 'Add Tab' to create one.</p>";
        return;
    }
    if (wasActive) {
        activeTabId = tabs[0].id;
    }
    saveTabs();
    renderTabs();
    switchTab(activeTabId);
}

function updateTabCount() {
    tabCount.textContent = `Tabs: ${tabs.length}`;
}

addTabBtn.addEventListener("click", addTab);

tabBar.addEventListener("click", (e) => {
    const tabBtn = e.target.closest(".tab-btn");
    if (!tabBtn) return;
    const tabId = Number(tabBtn.dataset.tabId);
    if (e.target.classList.contains("rename-btn")) {
        const newName = prompt("Enter new tab name:");
        renameTab(tabId, newName);
    }
    else if (e.target.classList.contains("delete-btn")) {
        deleteTab(tabId);
    }
    else {
        switchTab(tabId);
    }
});
loadTabs();