// =================== تنظیمات اولیه ===================
'use strict';

// متغیر واحد برای ذخیره نتایج
const calculationResults = {
    // ضرایب ریسک بالقوه
    q: null, i: null, g: null, e: null, v: null, z: null,
    
    // ضرایب سطح پذیرش
    a: null, t: null, c: null, r: null, d: null,
    
    // ضرایب سطح حفاظت
    W: null, N: null, S: null, F: null, U: null, Y: null,
    
    // نتایج محاسبات
    P: null, P1: null, P2: null,
    A: null, A1: null, A2: null,
    D: null, D1: null, D2: null,
    R: null, R1: null, R2: null
};

// =================== سیستم Navigation ===================

// نمایش بخش‌ها
function showSection(sectionId) {
    // مخفی کردن همه بخش‌ها
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
        section.classList.remove('active');
    });

    // نمایش بخش انتخاب شده
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
        selectedSection.classList.add('active');
    }

    // به‌روزرسانی منوی کناری
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // اسکرول به بالا
    window.scrollTo({ top: 0, behavior: 'smooth' });
}



// تابع نمایش تب‌ها
function showTab(tabId) {
    // مخفی کردن همه محتوای تب‌ها
    const allTabContents = document.querySelectorAll('.tab-content');
    allTabContents.forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none';
    });
    
    // حذف کلاس active از همه دکمه‌های تب
    const allTabs = document.querySelectorAll('.tab');
    allTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // نمایش محتوای تب انتخاب شده
    const selectedContent = document.getElementById(tabId);
    if (selectedContent) {
        selectedContent.classList.add('active');
        selectedContent.style.display = 'block';
    }
    
    // اضافه کردن کلاس active به دکمه تب فعال
    const activeTab = document.querySelector(`[onclick="showTab('${tabId}')"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
}

// اطمینان از اجرای کد بعد از بارگذاری DOM
document.addEventListener('DOMContentLoaded', function() {
    // --- کد مدیریت تب‌ها ---
    showTab('q-factor');
    const tabButtons = document.querySelectorAll('.tab');
    tabButtons.forEach(button => { /* ... همان کد فعلی ... */ });

    // --- کد Live Binding t ---
    const tInputs = [
        'occupant-factor','occupants-count','section-area-t','exit-widths','manual-k',
        'external-exits','mobility-factor','section-length-t','section-width-t',
        'height-above','height-below'
    ];
    function recalcT() {
        if (typeof calculateExitUnits === "function") calculateExitUnits();
        if (typeof calculateKfromPaths === "function") calculateKfromPaths();
        if (typeof calculateT === "function") calculateT();
    }
    tInputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', recalcT);
            el.addEventListener('change', recalcT);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const banner = document.getElementById('intro-banner');
    if (banner) {
        banner.style.display = 'block';
        // بعد از 6 ثانیه به آرامی محو شود
        setTimeout(() => {
            banner.style.transition = 'opacity 1s ease';
            banner.style.opacity = '0';
            setTimeout(() => banner.remove(), 1000);
        }, 10000);
    }
});


// =================== سیستم پیام‌رسانی ===================

function showMessage(type, message) {
    // حذف پیام قبلی
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // ایجاد پیام جدید
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    
    // اضافه کردن به صفحه
    const container = document.querySelector('.content');
    if (container) {
        container.insertBefore(messageDiv, container.firstChild);
        
        // حذف خودکار بعد از 3 ثانیه
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
}

// =================== محاسبات ریسک بالقوه (P) ===================

// محاسبه q - ضریب بار آتش
function calculateQ() {
    const qi = parseFloat(document.getElementById('qi')?.value) || 0;
    const qm = parseFloat(document.getElementById('qm')?.value) || 0;
    if (qi >= 0 && qm >= 0) {
        const Q = qi + qm;

        // بررسی حداقل مقدار
        if (Q <= 0) {
            showMessage('error', 'مجموع بار آتش باید بزرگتر از صفر باشد');
            return;
        }

        // محاسبه q طبق سند
        let q = (2/3) * Math.log10(Q) - 0.55;

        // محدود کردن مقدار
        q = Math.max(0.0, Math.min(q, 2.3));

        calculationResults.q = q;

        // نمایش هشدار اگر Q خیلی زیاد باشد (اثر کم بر q)
        let msg = '';
        if (Q > 8000) msg = '<span style="color:#d35400">توجه: افزایش Q بالاتر از 8000، تأثیر کم بر q خواهد داشت.</span>';
        if (Q <= 30) msg = '<span style="color:#c0392b">بار آتش بسیار پایین و مقدار q تقریباً صفر است. (کم‌ترین ریسک طبق نمودار)</span>';

        // نمایش عدد q و راهنمای مقایسه
        updateDisplay('q-result', 'q', calculationResults.q, `
            <div style="margin:0.7em 0 0 0;font-size:.93em">
                <span style="color:#607d8b;">(Q = ${Q} MJ/m²)</span>
            </div>`);

        showMessage('success', 'ضریب بار آتش محاسبه شد');
        checkAndCalculateP();
    }
}

// نمایش جدول Qi و Qm مختصر هنگام کلیک
function showQiGuide() {
    document.getElementById('qi-hint').innerHTML =
        `<b>A. کاملاً غیرقابل احتراق (مانند بتن / فقط فولاد):</b> 0<br>
<b>B. سازه غیرقابل احتراق با حداکثر ۱۰٪ اجزای قابل احتراق مجاز مانند پنجره‌ها، پوشش سقف و غیره:</b> 100<br>
<b>C1. سازه چوبی با تکمیل با مواد غیرقابل احتراق:</b> 300<br>
<b>C2. سازه بنایی با کف‌ها و تیرهای چوبی:</b> 300<br>
<b>D. سازه غیرقابل احتراق با پوشش نهایی قابل احتراق:</b> 1000<br>
<b>E. سازه کاملاً قابل احتراق:</b> 1500`;
    document.getElementById('qi-hint').style.display = "block";
    setTimeout(()=>{document.getElementById('qi-hint').style.display="none"}, 4000);
}
function showQmGuide() {
    document.getElementById('qm-hint').innerHTML =
        `<b>خطر آتش‌سوزی کم (LH):</b> 200<br>
<b>اداری:</b> 400 (بازه: 80–550)<br>
<b>مسکونی:</b> 500 (بازه: 330–780)<br>
<b>مدرسه:</b> 200 (بازه: 215–340)<br>
<b>بیمارستان:</b> 250 (بازه: 100–330)<br>
<b>هتل:</b> 250 (بازه: 310–330)<br>
<b>خطر معمولی با بار کم (OH1):</b> 600<br>
<b>خطر معمولی با بار متوسط (OH2):</b> 1500<br>
<b>خطر معمولی با بار زیاد (OH3):</b> 2000<br>
<b>خطر معمولی با بار بسیار زیاد (OH4):</b> 2500<br>
<b>کلاس خطر زیاد HH1:</b> 2500<br>
<b>کلاس خطر زیاد HH2:</b> 3000<br>
<b>کلاس خطر زیاد HH3:</b> 3750<br>
<b>ذخیره قفسه‌ای:</b> 6750<br>
<b>انبار محافظت‌شده با قطر بزرگ:</b> 7500<br>
<b>انبار ESFR (ارتفاع ۷ متر):</b> 12000 (بازه: 0)<br>
<b>انبار ESFR (۵.۵ بار):</b> 15000 (بازه: 0)`;
    document.getElementById('qm-hint').style.display = "block";
    setTimeout(()=>{document.getElementById('qm-hint').style.display="none"}, 4000);
}


function computeMFromDims() {
    // گرفتن اطلاعات از ورودی‌ها
    const d1 = parseFloat(document.getElementById('dim1')?.value) || 0;
    const d2 = parseFloat(document.getElementById('dim2')?.value) || 0;
    const d3 = parseFloat(document.getElementById('dim3')?.value) || 0;

    // بررسی ابعاد مثبت
    const dims = [d1, d2, d3].filter(v => v > 0);
    if (dims.length === 0) return 0.3; // مقدار پیش‌فرض امن

    // محاسبه میانگین هندسی
    const product = dims.reduce((acc, val) => acc * val, 1);
    let m = Math.pow(product, 1 / dims.length);

    // محدود کردن به 0.001 تا 2
    m = Math.max(0.001, Math.min(m, 2));

    return m;
}


// محاسبه i - ضریب گسترش (مطابق توصیه سند)
function calculateI() {
    const T = parseFloat(document.getElementById('temp-destruction').value) || 250;
    let m = parseFloat(document.getElementById('avg-dimension').value);
    if (isNaN(m) || m <= 0) {
        const mode = document.querySelector('input[name="m-mode"]:checked').value;
        if (mode === 'formula') {
            const inputs = document.querySelectorAll('#dims-table .dim-input');
            const dims = [];
            inputs.forEach(inp => {
                const val = parseFloat(inp.value);
                if (!isNaN(val) && val > 0) dims.push(val);
            });
            if (dims.length > 0) m = computeMFromDims(dims);
        }
        if (isNaN(m) || m <= 0) m = 0.3;
    }
    const M = parseFloat(document.getElementById('fire-class').value) || 3;

    const T_clamped = Math.max(20, Math.min(T, 800));
    const m_clamped = Math.max(0.001, Math.min(m, 10));
    const M_clamped = Math.max(0, Math.min(M, 5));

    let i = 1 - (T_clamped / 1000) - (0.1 * Math.log10(m_clamped)) + (M_clamped / 10);
    i = Math.max(0.4, Math.min(i, 1.8));

    calculationResults.i = i;
    const HRR = 25 * Math.pow(10, i);
    updateDisplay('i-result', 'i', i, `<br><b>HRR:</b> ${HRR.toLocaleString(undefined,{maximumFractionDigits:0})} kW/m²<br>`);
    showMessage('success', 'ضریب گسترش (i) و HRR محاسبه شدند');
    checkAndCalculateP();
}





function handleTSelectionChange() {
    const select = document.getElementById('temp-destruction');
    const table = document.getElementById('t-weighted-table');

    if (select.value === "multi") {
        table.style.display = "block";
    } else {
        table.style.display = "none";
        window.selectedTValue = parseFloat(select.value) || 250;
        calculateI(); // محاسبه فوری
    }
}

function updateWeightedT() {
    const table = document.getElementById('t-weighted-table');
    if (!table) return;

    const rows = table.querySelectorAll('tbody tr');
    let weightedSum = 0;
    let totalPct = 0;

    rows.forEach(row => {
        const tempVal = parseFloat(row.cells[1].textContent) || 0;
        const pctInput = row.cells[3].querySelector('input[type="number"]');
        const pct = parseFloat(pctInput?.value) || 0;

        if (!pctInput.disabled && pct > 0) {
            weightedSum += tempVal * (pct / 100);
            totalPct += pct;
        }
    });

    // ذخیره در window
    window.selectedTValue = totalPct > 0 ? weightedSum : 250;

    document.getElementById('t-percent-sum').textContent = totalPct + ' %';
    document.getElementById('t-weighted-value').textContent =
        window.selectedTValue.toFixed(2) + ' °C';

    // همیشه بعد از تغییر، محاسبه رو به‌روزرسانی کن
    calculateI();
}



// راهنمای مقدارهای ابعاد متوسط (m)
function showMHint() {
    document.getElementById('m-hint').innerHTML =
        `<b>فرمول محاسبه m:</b><br>
        m = (d₁ × d₂ × d₃)^(1/3) <span style="color:#888">(میانگین هندسی ابعاد)</span><br>
        <b>گام‌ها:</b> طول × عرض × ارتفاع ⇒ ریشه مکعب ⇒ m بر حسب متر<br>
        <b>محدوده معتبر:</b> حداقل 0.001 m و حداکثر 2 m<br><br>
        <b>مثال:</b> جعبه 0.5 × 0.4 × 0.3 m ⇒ m = 0.394 m<br><br>
        <b>مقادیر مرجع:</b><br>
        اشیاء معمول زندگی: <b>0.3</b> m<br>
        اجناس پالت: <b>1</b> m<br>
        محصولات کوچک: <b>0.1</b> m<br>
        رول کاغذ یا فیلم: <b>0.01</b> m<br>
        دانه یا گرانول: <b>0.001</b> m`;
    document.getElementById('m-hint').style.display = "block";
    setTimeout(()=>{document.getElementById('m-hint').style.display="none"}, 8000);
}


// راهنمای کلاس واکنش به آتش (M)
function showClassHint() {
    document.getElementById('class-hint').innerHTML =
        `<table style="font-size:0.93em"><tr>
        <th>EN13501-1</th><th>M</th><th>مثال</th></tr>
        <tr><td>A1</td><td>0</td><td>بتن، سنگ، فولاد</td></tr>
        <tr><td>A2</td><td>0.5</td><td>شیشه، آجر نسوز</td></tr>
        <tr><td>B</td><td>1</td><td>گچ، پانل دیرسوز</td></tr>
        <tr><td>C</td><td>2</td><td>چوب طبیعی، کفپوش پارکت</td></tr>
        <tr><td>D</td><td>3</td><td>فرش پلاستیکی، پلیمرها</td></tr>
        <tr><td>E</td><td>4</td><td>فوم‌های قابل اشتعال</td></tr>
        <tr><td>F</td><td>5</td><td>پلی‌استایرن منبسط<br></td></tr>
        </table>`;
    document.getElementById('class-hint').style.display = "block";
    setTimeout(()=>{document.getElementById('class-hint').style.display="none"}, 7000);
}

// محاسبه g - ضریب سطح (با فرمول دقیق)
function calculateG() {
    let l = parseFloat(document.getElementById('section-length').value) || 0;
    let b = parseFloat(document.getElementById('section-width').value) || 0;
    let area = parseFloat(document.getElementById('section-area').value) || (l > 0 && b > 0 ? l * b : 0);
    let accessType = document.getElementById('access-type').value;

    let warning = "";
    let g = null;

    // در صورت انتخاب دسترسی از ضلع باریک، طول و عرض را جابجا کن
    if(accessType === 'narrow') {
        // جابجا کردن l و b برای مدل narrow side access
        let temp = l;
        l = b;
        b = temp;
    }

    // اگر مساحت داده شده بود و یکی از l یا b صفر بود، بعد دیگر را محاسبه کن
    if(area > 0 && (l === 0 || b === 0)) {
        if(l === 0 && b !== 0) l = area / b;
        if(b === 0 && l !== 0) b = area / l;
    }

    // محاسبه فقط با داده‌های مثبت
    if(l > 0 && b > 0) {
        // فرمول اصلی طبق استاندارد
        let innerCalc = b * b * l;   // b^2 * l
         let cubeRoot = Math.cbrt(innerCalc); // ∛(b^2 * l)
           g = (b + 5 * cubeRoot) / 200;

        // اخطار رنج علمی (طبق سند و چارت)
        if(g > 9) warning = "⚠️ مقدار g بسیار زیاد است (ساختمان بسیار بزرگ - توصیه به تفکیک).";
        else if(g > 3) warning = "ℹ️ مقدار g بالاست (احتمالاً نیاز به اسپرینکلر/تفکیک)." ;
        else if(g < 0.5) warning = "ℹ️ مقدار g پایین است (محیط کوچک یا کشیده).";
    }

    // نمایش نتیجه و نکات تحلیلی
    let html = "";
    if(g !== null) {
        html = `
            <span class="result-value">${g.toFixed(2)}</span>
            <span class="badge-iClass" style="background:#b3e5fc;color:#0d47a1;">ضریب g</span>
            <div style="margin-top:10px">${warning ? "<span class='input-hint' style='display:block'>" + warning + "</span>" : ""}</div>
            <div style="color:#888; font-size:0.95em; margin-top:8px;">
              مساحت: ${(l*b).toLocaleString()} مترمربع&nbsp;&bull;&nbsp;طول: ${l} متر&nbsp;&nbsp;عرض: ${b} متر
            </div>
        `;
    } else {
        html = "<span style='color:#c00'>خطای ورودی: لطفاً تمام داده‌ها را وارد کنید.</span>";
    }

    document.getElementById('g-result').innerHTML = html;

    // نمایش tip در کارت فرمول
    let areaTip = "";
    if(l > 0 && b > 0) {
        areaTip = `Area = ${l} × ${b} = ${(l*b).toLocaleString()} m²`;
    }
    document.getElementById('area-tip').innerText = areaTip;

    // ذخیره مقدار خروجی برای سایر محاسبات
    calculationResults.g = g;
    checkAndCalculateP();
}

function showGuide(type) {
    let content = '';
    switch(type) {
        case 'access':
            content = `
            <b>نوع دسترسی به ساختمان</b>
            <br>
            <span style='color:#666'>
            نوع ضلع دسترسی آتش‌نشانان بر سرعت و اثربخشی عملیات کنترل آتش تاثیر زیادی دارد.<br>
            - <b>دسترسی از ضلع عریض (Wide)</b> یعنی دسترسی به ساختمان از ضلع بزرگ‌تر پلان است و آتش‌نشانی می‌تواند به بخش زیادی از محیط سریع دسترسی داشته باشد.<br>
            - <b>دسترسی از ضلع باریک (Narrow)</b> یعنی فقط ضلع کوچک‌تر در معرض دسترسی آتش‌نشانان است. در این حالت گسترش آتش کنترل سخت‌تری دارد و طول و عرض برای محاسبه ضریب g جابجا در نظر گرفته می‌شوند (<b>مطابق بخش 4.5.2 سند FRAME</b>).
            <br>
            انتخاب درست نوع دسترسی بسیار مهم است، زیرا روی برآورد ایمنی اثر مستقیم می‌گذارد.
            </span>
            `;
            break;
        case 'length':
            content = `
            <b>طول بخش (l)</b>
            <br>
            <span style='color:#666'>
            <b>l</b> برابر با بیشترین فاصله بین مرکز دو ضلع روبروی هم در محدوده پلان طبقه است.<br>
            اگر شکل پلان مستطیل است، همان طول واقعی بزرگ‌تر را وارد کنید.<br>
            <b>در پلان‌های نامنظم</b>، از طول فرضی (طبق راهنمای سند: مساحت تقسیم بر عرض معادل) استفاده کنید.<br>
            <i>مثال:</i> در یک پلان مربعی، طول برابر با عرض خواهد بود. اگر پلان باریک است، طول همان ضلع بلند خواهد شد.
            </span>
            `;
            break;
        case 'width':
            content = `
            <b>عرض بخش (b)</b>
            <br>
            <span style='color:#666'>
            <b>b</b> معادل عرض موثر پلان در نقطه ورودی یا "عرض معادل" است (بدست آمده از تقسیم مساحت بخش به طول l).<br>
            ورود مقدار دقیق عرض زمانی ضروری است که پلان نامتقارن یا کشیده باشد.<br>
            در صورت عدم قطعیت، از تقسیم مساحت به طول برای محاسبه استفاده کنید.<br>
            <i>یادآوری:</i> اگر فقط مساحت و طول را می‌دانید، می‌توانید مقدار عرض را خالی بگذارید تا سیستم خودش محاسبه کند.
            </span>
            `;
            break;
        case 'area':
            content = `
            <b>مساحت (اختیاری)</b>
            <br>
            <span style='color:#666'>
            اگر فقط مساحت پلان را دارید و یکی از ابعاد l یا b را می‌دانید، وارد کردن مقدار مساحت کافی است.<br>
            <b>مساحت معادل = طول × عرض</b><br>
            در محاسبه ضریب گسترش (g)، این مقدار به تعیین دقیق ابعاد موثر خصوصاً در پلان‌های نامنظم و راهروها کمک می‌کند.<br>
            <i>توصیه:</i> همیشه از مقدار دقیق و مهندسی‌شده مساحت طبق نقشه تأیید شده استفاده کنید.
            </span>
            `;
            break;
    }
    showCustomModal('راهنمای ورودی', content);
}



// مودال ساده برای نمایش هر راهنما (قابل بهبود با کتابخانه‌های modal دلخواه)
function showCustomModal(title, content) {
    let modalBg = document.createElement('div');
    modalBg.className = 'modal-bg';
    modalBg.onclick = function() { modalBg.remove(); };
    let modalBox = document.createElement('div');
    modalBox.className = 'modal-guide';
    modalBox.innerHTML = `
        <div class='modal-title'>${title}</div>
        <div class='modal-content'>${content}</div>
        <button onclick="this.closest('.modal-bg').remove()" class="btn btn-guide-close">بستن</button>
    `;
    modalBg.appendChild(modalBox);
    document.body.appendChild(modalBg);
}

document.addEventListener('DOMContentLoaded', () => {
    const guideBtn = document.getElementById('special-guide-btn');
    if (guideBtn) {
        guideBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const guideContent = `
                <h2>راهنمای ویژه FRAME 2015 - آتریوم، Mezzanine، لوفت و دوبلکس</h2>

                <p>در روش FRAME 2015، فضاهای معماری ویژه مانند <strong>آتریوم</strong>، نیم‌طبقه یا <em>mezzanine</em>، و همچنین واحدهای دوبلکس یا لوفت، شرایط خاصی در محاسبات ضرایب <strong>e</strong>، <strong>z</strong> و گاهی <strong>g</strong> به‌وجود می‌آورند. عدم توجه به این موارد می‌تواند منجر به برآورد نادرست ریسک حریق شود.</p>

                <h3>۱. Mezzanine (نیم‌طبقه)</h3>
                <p>نیم‌طبقه بخشی است که مساحت آن کمتر از طبقه کامل بوده و معمولاً درون طبقه اصلی ساخته می‌شود. در FRAME، اثر mezzanine بیشتر بر ضریب e و z دیده می‌شود:</p>
                <ul>
                    <li>اگر نیم‌طبقه به‌صورت داخلی به فضای اصلی متصل باشد (خروج داخلی)، تخلیه و تهویه سخت‌تر است و در محاسبه e باید به‌صورت <strong>اعشار</strong> به طبقه کامل اضافه شود. مثال: طبقه اول با ۴۰٪ مساحت نیم‌طبقه → <code>E = 1.4</code>.</li>
                    <li>اگر نیم‌طبقه خروج مستقیم به بیرون داشته باشد، اثر آن متفاوت است و ممکن است دسترسی امداد بهبود پیدا کند (z کمتر).</li>
                </ul>
                <figure>
                    <img src="images/mezz_int_exit.png" alt="Mezzanine with internal exit" style="max-width:100%">
                    <figcaption>نیم‌طبقه با خروج داخلی - نیازمند محاسبه e اعشاری و بررسی تأثیر بر z</figcaption>
                </figure>
                <figure>
                    <img src="images/mezz_dir_exit.png" alt="Mezzanine with direct exit" style="max-width:100%">
                    <figcaption>نیم‌طبقه با خروج مستقیم - بهبود تخلیه و کاهش بار روی ضریب t</figcaption>
                </figure>

                <h3>۲. آتریوم</h3>
                <p>آتریوم فضایی باز و چندسطحی است که معمولاً طبقات را در بر می‌گیرد و باعث ارتباط مستقیم بین بخش‌های مختلف ساختمان می‌شود.</p>
                <ul>
                    <li>در محاسبه <strong>e</strong>، باید ارتفاع مؤثر طبقه را بر اساس بالاترین نقطه قابل‌استفاده محاسبه کرد.</li>
                    <li>آتریوم بر تخلیه دود و مسیرهای دسترسی امداد اثر دارد و می‌تواند k (نسبت تهویه) و v (ضریب تهویه) را تغییر دهد.</li>
                </ul>
                <figure>
                    <img src="images/atrium_levels.png" alt="Atrium Level Factor Example" style="max-width:100%">
                    <figcaption>چیدمان طبقات و نحوه محاسبه e در یک آتریوم</figcaption>
                </figure>

                <h3>۳. لوفت و دوبلکس</h3>
                <p>در واحدهای دوبلکس یا لوفت، طبقه بالایی بدون جداسازی کامل به طبقه پایین متصل است. این موضوع باعث می‌شود:</p>
                <ul>
                    <li>در محاسبه <strong>e</strong>، شماره طبقه به‌صورت اعشاری در نظر گرفته شود (مشابه mezzanine).</li>
                    <li>برای <strong>z</strong>، باید دسترسی آتش‌نشانی به هر دو سطح بررسی شود، حتی اگر فقط یک ورودی مشترک وجود داشته باشد.</li>
                </ul>
                <figure>
                    <img src="images/loft_duplex.png" alt="Loft and Duplex Access" style="max-width:100%">
                    <figcaption>دسترسی امداد به طبقات لوفت و دوبلکس و تأثیر بر z</figcaption>
                </figure>

                <h3>۴. اثر بر سایر ضرایب</h3>
                <p>این فضاهای خاص ممکن است ضریب <strong>g</strong> را نیز تغییر دهند، خصوصاً اگر به افزایش ابعاد مؤثر پلان منجر شوند یا دسترسی از ضلع باریک/عریض تغییر کند.</p>

                <hr>
                <p style="font-size:0.9em;color:#555">این راهنما بر اساس نسخه 2015 FRAME تهیه شده است. در نسخه 2008 ممکن است پارامترها و ضرایب کمی تفاوت داشته باشند.</p>
            `;

            showCustomModal('راهنمای ویژه FRAME - آتریوم و فضاهای خاص', guideContent);
        });
    }
});


// محاسبه e - ضریب طبقه
// محاسبه e - ضریب طبقه (سازگار با اعشار و سلول‌های نیم‌طبقه)
function calculateE() {
    let E = parseFloat(document.getElementById('floor-E').value);

    // کنترل مقدار ورودی
    if (isNaN(E)) {
        showMessage('error', 'شماره طبقه را وارد کنید. می‌توانید اعشاری وارد کنید (مثلاً 1.4)');
        return;
    }

    // محدود منطقی: مثلاً -4 تا 150
    if (E < -4 || E > 150) {
        showMessage('error', 'عدد طبقه باید بین -4 تا 150 باشد');
        return;
    }

    // مطابق تعریف FRAME، مقدار مطلق E
    let absE = Math.abs(E);

    // فرمول اصلی (دقت اعشاری برای گالری/نیم‌طبقه مهم است)
    let e = Math.pow((absE + 3) / (absE + 2), 0.7 * absE);

    // کپ کردن علمی (طبق سند: e حداقل 1، حداکثر 3 ولی معمولاً <2)
    e = Math.max(1.0, Math.min(e, 3.0));

    calculationResults.e = e;

    // تفسیر خروجی و رنگ
    let interp = '';
    let color = '#43a047';
    if (e <= 1.1) {
        interp = 'همکف/طبقات نزدیک زمین - ریسک معمولی';
    } else if (e <= 1.4) {
        interp = 'طبقات پایین (تا دوم) - ریسک کمی بیشتر';
        color = '#fbc02d';
    } else if (e <= 1.7) {
        interp = 'طبقات متوسط (۳ تا ۵ یا گالری بزرگ) - ریسک بالا';
        color = '#f57c00';
    } else if (e <= 2) {
        interp = 'طبقات بسیار بلند/زیرزمین‌های عمیق - ریسک ویژه!';
        color = '#d32f2f';
    } else {
        interp = 'عدد خیلی بالا! بررسی مدل لازم است.';
        color = '#880e4f';
    }

    document.getElementById('e-result').innerHTML =
        `<div style="font-size:1.6em;direction:ltr;color:${color};font-weight:bold;">
            e = ${e.toFixed(3)}
        </div>
        <div style="color:${color};margin-top:.5em;">${interp}</div>
        <div style="color:#777;font-size:.95em;margin-top:.5em;">
            مقدار واردشده: E = ${E} (${(E % 1 !== 0 ? 'اعشاری/گالری یا نیم‌طبقه' : 'شماره‌طبقه معمولی')})
        </div>`;

    showMessage('success', 'ضریب طبقه با دقت اعشاری محاسبه شد');
    checkAndCalculateP();
}


// محاسبه v - ضریب تهویه
function flowToArea(flow_Nm3h, Cd = 0.65, deltaP = 25) {
    const rho_air = 1.2; // kg/m³
    const flow_m3s = flow_Nm3h / 3600; // تبدیل به m³/s
    return flow_m3s / (Cd * Math.sqrt((2 * deltaP) / rho_air));
}


function autoCalculateK() {
    // دریافت ورودی‌ها
    let windowArea = parseFloat(document.getElementById('windowArea').value) || 0;
    const staticVentArea = parseFloat(document.getElementById('staticVentArea').value) || 0;
    const mechanicalVentFlow = parseFloat(document.getElementById('mechanicalVentFlow').value) || 0;
    const compartmentArea = parseFloat(document.getElementById('compartmentArea').value) || 1;

    // ✅ اصلاح مساحت پنجره‌ها (تقسیم بر 3.33)
    windowArea = windowArea / 3.33;

    // معادل سطح برای تهویه مکانیکی
    let mechanicalEquivArea = (mechanicalVentFlow > 0) ? (mechanicalVentFlow / 3600) : 0;

    // جمع کل بازشوها
    const totalOpenings = windowArea + staticVentArea + mechanicalEquivArea;

    // نسبت تهویه k
    let k = totalOpenings / compartmentArea;

    // محدود کردن مقدار k به بازه استاندارد: 0.001 تا 1
    let kClamped = Math.max(0.001, Math.min(k, 1.0));
    document.getElementById('venting-ratio').value = kClamped.toFixed(3);

    // تفسیر قابل فهم برای کاربر و اخطار
    let kMessage = 
        `(جمع مساحت بازشوها: ${totalOpenings.toFixed(2)} m²، کف: ${compartmentArea.toFixed(2)} m²، مکانیکی: ${mechanicalEquivArea.toFixed(2)} m²، ` +
        `Aₓ(w تقسیم‌شده بر 3.33): ${windowArea.toFixed(2)} m²)`;

    // هشدار اگر k کمتر از مقدار توصیه شده است (زیر 0.01)
    if (k < 0.01) {
        kMessage += `<br><span style="color:#c0392b; font-weight:bold;">⚠️ هشدار: نسبت k بسیار کم است (زیر 1%). تهویه ناکافی!</span>`;
        showMessage('warning', 'نسبت تهویه بسیار کم و غیرایمن است. استاندارد FRAME تهویه بالای 0.01 توصیه می‌کند.');
    } else {
        showMessage('success', 'نسبت k با موفقیت محاسبه شد');
    }

    document.getElementById('k-details').innerHTML = kMessage;
}



function toggleVentMode() {
    const mode = document.querySelector('input[name="ventMode"]:checked').value;
    document.getElementById('manual-vent').style.display = (mode === 'manual') ? 'block' : 'none';
    document.getElementById('advanced-vent').style.display = (mode === 'advanced') ? 'block' : 'none';
}

function calculateMechanicalFromAdvanced() {
    const Qv = parseFloat(document.getElementById('qv-advanced').value) || 0;
    const Cd = parseFloat(document.getElementById('cd-advanced').value) || 0.65;
    const deltaP = parseFloat(document.getElementById('deltaP-advanced').value) || 25;
    const rho = parseFloat(document.getElementById('rho-advanced').value) || 1.2;

    if (Qv <= 0 || Cd <= 0 || deltaP <= 0 || rho <= 0) {
        showMessage('error', 'لطفاً مقادیر Qv، Cd، ΔP، و ρ را به‌درستی وارد کنید');
        return;
    }

    // فرمول NFPA 204 / TR 12101-4
    const A_equiv = Qv / (Cd * Math.sqrt((2 * deltaP) / rho));

    // خروجی نهایی به Nm³/h (Qv به m³/s سپس ×3600)
    const flowNm3h = Qv * 3600;

    document.getElementById('mechanicalVentFlow').value = flowNm3h.toFixed(2);
    showMessage('success', `دبی مکانیکی معادل: ${flowNm3h.toFixed(2)} Nm³/h (A_eq=${A_equiv.toFixed(3)} m²)`);

    // بعد از محاسبه، حالت را روی دستی برگردانید تا autoCalculateK مستقیم بخواند
    document.querySelector('input[name="ventMode"][value="manual"]').checked = true;
    toggleVentMode();
}


function calculateV() {
    // دریافت ورودی‌ها
    const qm = parseFloat(document.getElementById('qm-ventilation').value) || 0;
    const k = parseFloat(document.getElementById('venting-ratio').value) || 0;
    const h = parseFloat(document.getElementById('ceiling-height').value) || 0;

    // صحت‌سنجی ورودی‌ها
    if (qm <= 0) {
        showMessage('error', 'بار آتش متحرک باید بزرگتر از صفر باشد');
        return;
    }
    if (k < 0.001 || k > 1) {
        showMessage('error', 'نسبت تهویه باید بین 0.001 و 1 باشد. لطفاً ابتدا دکمه "محاسبه خودکار k" را بزنید.');
        return;
    }
    if (h < 2 || h > 15) {
        showMessage('error', 'ارتفاع سقف باید بین 2 تا 15 متر باشد');
        return;
    }

    // محاسبه ضریب v طبق فرمول استاندارد
    const logQm = Math.log10(qm);
    const sqrtH = Math.sqrt(h);
    const sqrtKSqrtH = Math.sqrt(k * sqrtH);

    let v = 0.84 + 0.1 * logQm - sqrtKSqrtH;

    // محدودسازی v
    let vClamped = v; // نمایش مقدار واقعی


     calculationResults.v = vClamped;
     if (v < 0.5) showMessage('warning', 'v کمتر از 0.5 است — تهویه بسیار ضعیف!');
    // نمایش نتیجه با جزئیات فنی
    updateDisplay( 'v-result',  'v', vClamped,
        `جزئیات: (k=${k.toFixed(3)}، h=${h}، √(k×√h)=${sqrtKSqrtH.toFixed(3)})`
    );

    showMessage('success', 'ضریب تهویه (v) با موفقیت محاسبه شد');
}


// 🟢 لینک دوطرفه مساحت کل کف (A) بین g و v
(function linkAreaFields() {
    const areaG = document.getElementById('section-area');       // تب g
    const areaV = document.getElementById('compartmentArea');    // تب v

    if (!areaG || !areaV) return; // جلوگیری از خطا اگر عناصر هنوز لود نشده‌اند

    // نشانگر لینک 🔗 روی هر دو ورودی
    [areaG, areaV].forEach(el => {
        const badge = document.createElement('span');
        badge.textContent = '🔗';
        badge.title = 'پیوند با تب دیگر (A)';
        badge.style.cssText = `
            position:absolute; right:6px; top:6px; font-size:0.9em;
            opacity:0.7; transition:opacity 0.3s ease;
        `;
        const wrapper = el.closest('.input-wrapper');
        if (wrapper && !wrapper.querySelector('span.link-badge')) {
            badge.classList.add('link-badge');
            wrapper.style.position = 'relative';
            wrapper.appendChild(badge);
        }
    });

    // تابع همگام‌سازی
    let isSyncing = false;
    function syncFields(source, target) {
        if (isSyncing) return;
        isSyncing = true;
        target.value = source.value;
        target.classList.add('synced');
        setTimeout(() => target.classList.remove('synced'), 500);
        isSyncing = false;
    }

    // رویدادها
    areaG.addEventListener('input', () => syncFields(areaG, areaV));
    areaV.addEventListener('input', () => syncFields(areaV, areaG));
})();


// 🔵 محاسبه خودکار مساحت (A = l × b) و لینک دوطرفه بین g و v
(function autoAreaLink() {

  const areaG = document.getElementById('section-area');       // مساحت در تب g
  const lengthG = document.getElementById('section-length');   // طول
  const widthG  = document.getElementById('section-width');    // عرض
  const areaV = document.getElementById('compartmentArea');    // مساحت در تب v

  if (!areaG || !lengthG || !widthG || !areaV) return;

  let isSyncing = false;

  // تابع همگام‌سازی با جلوگیری از حلقه بازخورد
  function syncFields(source, target) {
    if (isSyncing) return;
    isSyncing = true;
    target.value = source.value;
    target.classList.add('synced');
    setTimeout(() => target.classList.remove('synced'), 500);
    isSyncing = false;
  }

  // تابع محاسبه خودکار مساحت وقتی طول یا عرض تغییر کرد
  function updateAreaFromDimensions() {
    const l = parseFloat(lengthG.value);
    const b = parseFloat(widthG.value);
    if (!isNaN(l) && !isNaN(b)) {
      const area = +(l * b).toFixed(2);
      areaG.value = area;
      syncFields(areaG, areaV); // ارسال خودکار به تب v
    }
  }

  // 🟢 رویدادها برای طول و عرض و مساحت دو طرف
  lengthG.addEventListener('input', updateAreaFromDimensions);
  widthG.addEventListener('input', updateAreaFromDimensions);
  areaG.addEventListener('input', () => syncFields(areaG, areaV));
  areaV.addEventListener('input', () => syncFields(areaV, areaG));

})();


// محاسبه z - ضریب دسترسی (اصلاح شده)
function calculateZ() {
    // گرفتن ورودی‌ها
    const b = parseFloat(document.getElementById('section-width-z').value) || 20;
    const Z = parseInt(document.getElementById('access-directions-z').value) || 1;
    const Hplus = parseFloat(document.getElementById('height-above-z').value) || 0;
    const Hminus = parseFloat(document.getElementById('height-below-z').value) || 0;
    

    // اعتبارسنجی پایه
    if (b <= 0) { showMessage('error', 'عرض ساختمان باید عددی مثبت باشد'); return; }
    if (Z < 1 || Z > 4) { showMessage('error', 'تعداد جبهه دسترسی باید بین 1 تا 4 باشد'); return; }

    // بخش اصلی محاسبات، به انتخاب طبقه بالا (Hplus > 0) یا زیرزمین (Hminus > 0)
    let termH = 0;
    let explain = "";
    if (Hminus > 0) {
        termH = Hminus / 3;
        explain = `\\( \\frac{b}{20\\times Z} + \\frac{H^-}{3} \\) = (${b}/(20×${Z})) + (${Hminus}/3)`;
    } else {
        termH = Hplus / 25;
        explain = `\\( \\frac{b}{20\\times Z} + \\frac{H^+}{25} \\) = (${b}/(20×${Z})) + (${Hplus}/25)`;
    }

    // محاسبه اصلی طبق فرمول جدید
    let inner = (b / (20 * Z)) + termH;
    let z = 1 + 0.05 * Math.floor(inner);

    // محدودسازی (مثلاً بین 1 و 2)
    z = Math.max(1, Math.min(z, 2));

    // نمایش عددی، همراه تفسیر
    document.getElementById('z-result').innerHTML = `
        <div style="direction:ltr;font-size:1.5em;color: #1565c0;font-weight:bold">
            z = ${z}
        </div>
        
    `;
    calculationResults.z = z;
    showMessage('success', 'ضریب دسترسی محاسبه شد');
    checkAndCalculateP();
}



// محاسبه مجموع P
function calculateTotalP() {
  alert('تابع صدا زده شد!');
    const res = calculationResults;

    // بررسی تمام ضرایب
    if (!res.q || !res.i || !res.g || !res.e || !res.v || !res.z) {
        showMessage('error', 'لطفاً ابتدا همه ضرایب را محاسبه کنید');
        return;
    }
    
    // محاسبه P ها
    res.P = res.q * res.i * res.g * res.e * res.v * res.z;
    res.P1 = res.q * res.i * res.e * res.v * res.z;
    res.P2 = res.i * res.g * res.e * res.v * res.z;
    
    updateDisplay('total-p', 'P', res.P);
    updateDisplay('total-p1', 'P₁', res.P1);
    updateDisplay('total-p2', 'P₂', res.P2);
    
    showMessage('success', 'ریسک‌های بالقوه محاسبه شدند');
}


// بررسی و محاسبه خودکار P
function checkAndCalculateP() {
    const res = calculationResults;
    if (res.q && res.i && res.g && res.e && res.v && res.z) {
        calculateTotalP();
    }
}

// =================== محاسبات سطح پذیرش (A) ===================

// محاسبه a - ضریب فعال‌سازی
function calculateA() {
    let a = 0;
    const ids = [
        'main-activity',
        'secondary-activity',
        'heat-transfer-type',
        'generator-location',
        'energy-source',
        'electrical-system',
        'flammable-liquids',
        'combustible-dust'
    ];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) a += parseFloat(el.value) || 0;
    });
    calculationResults.a = parseFloat(a.toFixed(2));
    updateDisplay('a-result', 'a', calculationResults.a);
    showMessage('success', `ضریب فعال‌سازی محاسبه شد: ${calculationResults.a}`);
    if (typeof checkAndCalculateA === 'function') {
        checkAndCalculateA();
    }
}


/// محاسبه t - زمان تخلیه (اصلاح شده - بدون رادیکال در مخرج)
// -------- واحدهای خروج (x) --------
function calculateExitUnits() {
    const exitWidthsInput = document.getElementById('exit-widths').value;
    if (!exitWidthsInput) return 0;

    const widths = exitWidthsInput.split(',')
        .map(w => parseFloat(w.trim()))
        .filter(w => !isNaN(w) && w >= 0.6); // حداقل 0.6 متر = یک واحد

    let totalUnits = 0;
    widths.forEach(width => totalUnits += width / 0.6);
    return totalUnits; // عدد اعشاری دقیق
}

// -------- محاسبه t بر اساس FRAME 2015 --------
// -------- محاسبه t بر اساس FRAME 2015 --------
function calculateT() {
    // b و l از ورودی یا g
    let b = parseFloat(document.getElementById('section-width-t').value);
    let l = parseFloat(document.getElementById('section-length-t').value);
    if (!b && calculationResults.b_g) b = calculationResults.b_g;
    if (!l && calculationResults.l_g) l = calculationResults.l_g;

    // ✅ محاسبه مساحت (با اولویت به ورودی دستی)
    let area = parseFloat(document.getElementById('section-area-t').value);
    if ((!area || area <= 0) && b > 0 && l > 0) {
        area = b * l;
        // نمایش خودکار مساحت محاسبه‌شده
        document.getElementById('section-area-t').value = area.toFixed(2);
    }

    // ✅ محاسبه تعداد افراد (X)
    let X = parseFloat(document.getElementById('occupants-count').value);
    const occFactor = parseFloat(document.getElementById('occupant-factor').value);
    
    // شرط کامل: اگر X خالی باشد و ضریب + مساحت موجود باشد
    if ((!X || X <= 0) && occFactor > 0 && area > 0) {
        X = Math.round(area * occFactor);
        document.getElementById('occupants-count').value = X;
        showMessage('info', `تعداد افراد محاسبه شد: ${X} نفر (بر اساس ${occFactor} نفر/m²)`);
    }

    // ✅ اگر هنوز X نداریم، متوقف می‌شویم
    if (!X || X <= 0) {
        console.warn('⚠️ تعداد افراد (X) صفر است یا وارد نشده');
        return;
    }

    // K - عرض مؤثر کل
    let K = parseFloat(document.getElementById('manual-k').value);
    if (!K || K <= 0) {
        const widths = document.getElementById('exit-widths').value.split(',')
            .map(w => parseFloat(w.trim()))
            .filter(w => !isNaN(w) && w >= 0.6);
        K = widths.reduce((sum, w) => sum + w, 0);
    }
    if (K < 0.6) {
        console.warn('⚠️ عرض کل خروج‌ها کمتر از حداقل (0.6m) است');
        return;
    }

    // x - تعداد واحدهای خروج
    const x = K / 0.6;

    const p = parseFloat(document.getElementById('mobility-factor').value) || 1;
    const Hplus = parseFloat(document.getElementById('height-above').value) || 0;
    const Hminus = parseFloat(document.getElementById('height-below').value) || 0;

    // بررسی نهایی ورودی‌های کلیدی
    if (b <= 0 || l <= 0) {
        console.warn('⚠️ طول یا عرض بخش صفر است');
        return;
    }

    // فرمول FRAME 2015
    const numerator = p * ((b + l) + (X / x) + (1.25 * Hplus) + (2 * Hminus)) * (x * (b + l));
    const denominator = 800 * K * ((1.4 * x * (b + l)) - (0.44 * X));
    
    if (denominator <= 0) {
        console.error('❌ مخرج فرمول منفی یا صفر است - بررسی کنید');
        return;
    }

    const tHours = numerator / denominator;
    const tValue = tHours * 60;   
    calculationResults.t = tValue;

    // نمایش خروجی‌ها
    document.getElementById('calc-x').textContent = x.toFixed(2);
    document.getElementById('calc-K').textContent = K.toFixed(2);
    document.getElementById('calc-time').textContent = tValue.toFixed(2);
    
    // تعیین وضعیت
    let status = '';
    let statusClass = '';
    if (tValue <= 1) { status = '✅ عالی'; statusClass = 'safe'; }
    else if (tValue <= 2) { status = '✅ خوب'; statusClass = 'good'; }
    else if (tValue <= 3) { status = '⚠️ متوسط'; statusClass = 'moderate'; }
    else if (tValue <= 4) { status = '⚠️ نیاز به بهبود'; statusClass = 'warning'; }
    else if (tValue <= 5) { status = '🔴 بحرانی'; statusClass = 'danger'; }
    else { status = '❌ غیرقابل قبول'; statusClass = 'critical'; }
    
    document.getElementById('calc-status').innerHTML = `<span class="${statusClass}">${status}</span>`;
    document.getElementById('t-intermediate').style.display = 'block';

    updateDisplay('t-result', 't', tValue, `<div class="result-details">زمان تخلیه واقعی بر حسب دقیقه</div>`);
    checkAndCalculateA();
}



// -------- Live-binding به همه ورودی‌های t --------
document.addEventListener('DOMContentLoaded', function() {
    const tInputs = [
        'occupant-factor', 'occupants-count', 'section-area-t', 'exit-widths', 'manual-k',
        'external-exits', 'mobility-factor', 'section-length-t', 'section-width-t',
        'height-above', 'height-below'
    ];

    function recalcT() {
        calculateT();
    }

    tInputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', recalcT);
            el.addEventListener('change', recalcT);
        }
    });

    // ✅ Listener ویژه برای occupant-factor
    const occFactorSelect = document.getElementById('occupant-factor');
    if (occFactorSelect) {
        occFactorSelect.addEventListener('change', function() {
            // پاک کردن مقدار قبلی X
            document.getElementById('occupants-count').value = '';
            // محاسبه مجدد
            calculateT();
        });
    }
});





// =================== توابع کمکی ===================

// تابع نمایش نتایج
function updateDisplay(elementId, label, value, additionalHTML = '') {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with id '${elementId}' not found`);
        return;
    }
    
    let html = '';
    if (value !== null && value !== undefined && !isNaN(value)) {
        html = `
            <div class="result-box">
                <span class="result-label">${label} = </span>
                <span class="result-value">${value.toFixed(3)}</span>
                ${additionalHTML}
            </div>
        `;
    } else {
        html = `<div class="result-error">مقدار نامعتبر</div>`;
    }
    
    element.innerHTML = html;
}

// تابع نمایش tooltip (اگر قبلاً تعریف نشده)
function showTooltip(element, content) {
    // حذف tooltip قبلی
    const existingTooltip = document.querySelector('.help-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }
    
    // ایجاد tooltip جدید
    const tooltip = document.createElement('div');
    tooltip.className = 'help-tooltip';
    tooltip.innerHTML = content;
    
    // موقعیت‌یابی
    const rect = element.getBoundingClientRect();
    tooltip.style.position = 'absolute';
    tooltip.style.top = (rect.bottom + window.scrollY + 5) + 'px';
    tooltip.style.left = rect.left + 'px';
    tooltip.style.maxWidth = '300px';
    
    document.body.appendChild(tooltip);
    
    // حذف خودکار بعد از 5 ثانیه
    setTimeout(() => {
        if (tooltip.parentNode) {
            tooltip.remove();
        }
    }, 5000);
    
    // حذف با کلیک خارج از tooltip
    document.addEventListener('click', function removeTooltip(e) {
        if (!tooltip.contains(e.target) && e.target !== element) {
            tooltip.remove();
            document.removeEventListener('click', removeTooltip);
        }
    });
}

// تابع checkAndCalculateA (اگر قبلاً تعریف نشده)
function checkAndCalculateA() {
    // بررسی وجود همه ضرایب مورد نیاز
    if (calculationResults.a !== null && 
        calculationResults.t !== null && 
        calculationResults.c !== null &&
        calculationResults.r !== null &&
        calculationResults.d !== null) {
        
        // محاسبه سطح پذیرش برای ساختمان
        calculationResults.A = 1.6 - calculationResults.a - calculationResults.t - calculationResults.c;
        
        // محاسبه سطح پذیرش برای افراد
        calculationResults.A1 = 1.6 - calculationResults.a - calculationResults.t - calculationResults.r;
        
        // محاسبه سطح پذیرش برای فعالیت‌ها
        calculationResults.A2 = 1.6 - calculationResults.a - calculationResults.c - calculationResults.d;
        
        // نمایش نتایج
        updateDisplay('a-building-result', 'A', calculationResults.A);
        updateDisplay('a-people-result', 'A₁', calculationResults.A1);
        updateDisplay('a-activity-result', 'A₂', calculationResults.A2);
        
        console.log('سطح پذیرش محاسبه شد:', {
            A: calculationResults.A,
            A1: calculationResults.A1,
            A2: calculationResults.A2
        });
    }
}


// نمایش tooltip
function showTooltip(element, content) {
    // حذف tooltip قبلی
    const existingTooltip = document.querySelector('.custom-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }
    
    // ایجاد tooltip جدید
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.innerHTML = content;
    
    // موقعیت‌یابی
    const rect = element.getBoundingClientRect();
    tooltip.style.position = 'absolute';
    tooltip.style.top = (rect.bottom + 5) + 'px';
    tooltip.style.left = rect.left + 'px';
    
    document.body.appendChild(tooltip);
    
    // حذف خودکار
    setTimeout(() => {
        tooltip.remove();
    }, 5000);
}






// محاسبه c - ضریب ارزش (با فرمول c2)
// شاخص ساخت (Building Cost Index) فرضی - سال پایه 2000 = 100
// =================== داده‌های پایه ===================
const iranConstructionIndex = {
    2000: 100,
    2005: 212.5,
    2010: 540.3,
    2015: 1150.7,
    2020: 4200.5,
    2021: 5980.2,
    2022: 7450.1,
    2023: 8800.0,
    2024: 10150.0,
    2025: 11400.0
};

const eurExchangeRate = {
    2000: 9500,
    2005: 11500,
    2010: 13500,
    2015: 33000,
    2020: 175000,
    2021: 285000,
    2022: 310000,
    2023: 430000,
    2024: 500000,
    2025: 1100000
};

function forecastValue(lastValue, growthPercent, yearsAhead) {
    return lastValue * Math.pow(1 + growthPercent / 100, yearsAhead);
}

function getDataOrForecast(dataObj, year, growth) {
    const years = Object.keys(dataObj).map(y => parseInt(y)).sort((a, b) => a - b);
    const lastYear = years[years.length - 1];

    if (dataObj[year]) return { value: dataObj[year], forecast: false };

    if (year > lastYear) {
        const forecastVal = forecastValue(dataObj[lastYear], growth, year - lastYear);
        dataObj[year] = forecastVal; // ذخیره دائم پیش‌بینی
        return { value: forecastVal, forecast: true };
    }
    return null;
}

function convertIranValueTo2000EUR(valueRial, year) {
    const idxInfo = getDataOrForecast(iranConstructionIndex, year, 15);
    const rateInfo = getDataOrForecast(eurExchangeRate, year, 12);
    if (!idxInfo || !rateInfo) return null;

    const eurThisYear = valueRial / rateInfo.value;
    return {
        eur2000: eurThisYear / (idxInfo.value / 100),
        eurThisYear,
        idxInfo,
        rateInfo
    };
}

function calculateC() {
    const c1 = parseFloat(document.getElementById('replaceability').value) || 0;
    const valRial = parseFloat(document.getElementById('current-value-rial').value) || 0;
    const year = parseInt(document.getElementById('value-year').value);

    let c2 = 0;
    let calcData = null;

    if (valRial && year) {
        calcData = convertIranValueTo2000EUR(valRial, year);
        if (calcData && calcData.eur2000 > 7100000) {
            c2 = 0.25 * Math.log10(calcData.eur2000 / 7100000);
        }
    }

    calculationResults.c = c1 + c2;

    const explanation = `(c₁=${c1.toFixed(2)}, c₂=${c2.toFixed(3)})<br>
                          معادل سال 2000 ≈ ${calcData ? calcData.eur2000.toLocaleString() + ' €' : '---'}`;
    updateDisplay('c-result', 'c', calculationResults.c, explanation);

    if (calcData) {
        const note = f => f ? '📈 پیش‌بینی‌شده' : '✅ واقعی';
        document.getElementById('calc-description').innerHTML =
            document.getElementById('calc-description').innerHTML = `
    <b>داده‌های واقعی/پیش‌بینی:</b><br>
    نرخ یورو ${year}: ${calcData.rateInfo.value.toLocaleString()} ریال (${note(calcData.rateInfo.forecast)})<br>
    شاخص ساخت ${year}: ${calcData.idxInfo.value.toLocaleString()} (${note(calcData.idxInfo.forecast)})<br>
    یورو همان سال: ${calcData.eurThisYear.toFixed(2)} €<br>
    یورو معادل 2000: ${calcData.eur2000.toFixed(2)} €<br>
    c = ${calculationResults.c.toFixed(3)}`;

    }

    checkAndCalculateA();
}

function toggleCalcDescription() {
    const box = document.getElementById('calc-description');
    box.style.display = (box.style.display === 'none') ? 'block' : 'none';
}







// محاسبه r - ضریب محیطی
function calculateR() {
    let qi = parseFloat(document.getElementById('qi-fixed')?.value) || 0;
    let M = parseFloat(document.getElementById('flame-class')?.value) || 0;

    qi = Math.max(0, Math.min(qi, 20000));
    M = Math.max(0, Math.min(M, 5));

    if (qi < 0) {
        showMessage('error', 'مقدار Qi نمی‌تواند منفی باشد');
        return;
    }

    let rValue = 0.1 * Math.log10(qi + 1) + (M / 10);

    rValue = Math.max(0, Math.min(rValue, 2));

    calculationResults.r = rValue;

    let badgeColor = "#4CAF50";
    if (rValue > 1.2) badgeColor = "#E64A19";
    if (rValue > 1.6) badgeColor = "#C62828";

    const extraInfo = `
        <div style="margin:0.7em 0 0 0;font-size:.93em;color:#607d8b;">
            Qi = ${qi} MJ/m² , M = ${M}
        </div>
    `;

    updateDisplay('r-result', 'r', rValue, extraInfo, badgeColor);
    showMessage('success', 'ضریب محیطی (نسخه 2008) محاسبه شد');
    checkAndCalculateA();
}

window.calculateR = calculateR;



// محاسبه d - ضریب وابستگی
// فعال/غیرفعال کردن ورودی دستی براساس انتخاب گروه
document.getElementById('dependency-category').addEventListener('change', function() {
    const manualInput = document.getElementById('dependency-manual');
    if (this.value === 'manual') {
        manualInput.disabled = false;
        manualInput.style.opacity = 1;
    } else {
        manualInput.disabled = true;
        manualInput.style.opacity = 0.5;
        manualInput.value = '';
    }
});

function calculateD() {
    const categoryValue = document.getElementById('dependency-category')?.value;
    const manualValue = parseFloat(document.getElementById('dependency-manual')?.value) || null;

    let d = null;

    if (categoryValue && categoryValue !== 'manual') {
        d = parseFloat(categoryValue);
    } 
    else if (categoryValue === 'manual') {
        if (manualValue === null || isNaN(manualValue)) {
            showMessage('error', 'لطفاً مقدار دستی d را وارد کنید');
            return;
        }
        if (manualValue < 0 || manualValue > 1) {
            showMessage('error', 'مقدار دستی d باید بین 0 و 1 باشد');
            return;
        }
        d = manualValue;
    } 
    else {
        showMessage('error', 'لطفاً یک گروه فعالیت انتخاب کنید');
        return;
    }

    calculationResults.d = d;
    updateDisplay('d-result', 'd', d);
    showMessage('success', 'ضریب وابستگی (نسخه 2015) محاسبه شد');
    checkAndCalculateA();
}



// محاسبه مجموع A
function calculateTotalA() {
    const res = calculationResults;
    
    if (res.a !== null && res.t !== null && res.c !== null && 
        res.r !== null && res.d !== null) {
        
        res.A = 1.6 - res.a - res.t - res.c;
        res.A1 = 1.6 - res.a - res.t - res.r;
        res.A2 = 1.6 - res.a - res.c - res.d;
        
        // محدود کردن مقادیر
        res.A = Math.max(0.1, res.A);
        res.A1 = Math.max(0.1, res.A1);
        res.A2 = Math.max(0.1, res.A2);
        
        updateDisplay('total-a', 'A', res.A);
        updateDisplay('total-a1', 'A₁', res.A1);
        updateDisplay('total-a2', 'A₂', res.A2);
        
        showMessage('success', 'سطوح پذیرش محاسبه شدند');
    }
}

// بررسی و محاسبه خودکار A
function checkAndCalculateA() {
    const res = calculationResults;
    if (res.a !== null && res.t !== null && res.c !== null && 
        res.r !== null && res.d !== null) {
        calculateTotalA();
    }
}

// =================== محاسبات سطح حفاظت (D) ===================


// محاسبه W - ضریب منابع آب
// محاسبه W - فقط بر اساس FRAME 2015
// راهنماهای تکمیلی W
function showGuideW(type) {
    let content = '';
    switch(type) {
        case 'w1':
            content = `
            <b>نوع ذخیره آب (w₁)</b><br>
            - ذخیره اتوماتیک: مخزن آب که به‌طور خودکار پر می‌شود – جریمه 0<br>
            - ذخیره دستی: نیاز به پر کردن با عملیات دستی – جریمه 4<br>
            - بدون ذخیره (≤ 300 متر): جریمه 10<br>
            `;
            break;
        case 'w2':
            content = `
            <b>ظرفیت ذخیره آب موجود (w₂)</b><br>
            آب مورد نیاز (m³) = مجموع بار آتش (MJ/m²) ÷ 4<br>
            درصد پوشش نسبت به مقدار موردنیاز جریمه را تعیین می‌کند:<br>
            100% → 0<br>
            90% → 1<br>
            80% → 2<br>
            70% → 3<br>
            کمتر از 70% → 4<br>
            `;
            break;
        case 'w3':
            content = `
            <b>شبکه توزیع آب (w₃)</b><br>
            - شبکه مناسب: جریمه 0<br>
            - محدود: جریمه 2<br>
            - بدون شبکه: جریمه 6<br>
            این بر اساس توان تأمین آب مورد نیاز در 2 ساعت بدون افت فشار است.<br>
            `;
            break;
        case 'w4':
            content = `
            <b>اتصالات هیدرانت (w₄)</b><br>
            نیاز: ≥ 1 اتصال 2.5" (قطر 70mm) برای هر 50m محیط ساختمان.<br>
            هر اتصال 3" = 2 اتصال 2.5"<br>
            هر اتصال 4" = 3 اتصال 2.5"<br>
            تعداد ناکافی جریمه دارد.<br>
            `;
            break;
    }
    showCustomModal('راهنمای ' + type.toUpperCase(), content);
}

// محاسبه W طبق FRAME 2015 با آپدیت زنده
function calculateW2015() {

    
    let w = 0;
    let details = {};

    // w1 - نوع ذخیره آب
    const storageType = document.getElementById('water-storage-type').value;
    details.w1 =
        storageType === 'auto' ? 0 :
        storageType === 'manual' ? 4 : 10;
    w += details.w1;

    // w2 - ظرفیت ذخیره آب
    const qi = parseFloat(document.getElementById('qi')?.value) || 0;
    const qm = parseFloat(document.getElementById('qm')?.value) || 0;
    const requiredWater = (qi + qm) / 4; // m³
    const available = parseFloat(document.getElementById('water-capacity').value) || 0;
    const ratio = available / requiredWater;

    if (ratio >= 1) details.w2 = 0;
    else if (ratio >= 0.9) details.w2 = 1;
    else if (ratio >= 0.8) details.w2 = 2;
    else if (ratio >= 0.7) details.w2 = 3;
    else details.w2 = 4;
    w += details.w2;

    // w3 - شبکه توزیع آب
    const net = document.getElementById('distribution-network').value;
    details.w3 =
        net === 'adequate' ? 0 :
        net === 'limited' ? 2 : 6;
    w += details.w3;

    // w4 - تعداد هیدرانت‌ها و محیط
    const hydr25 = parseInt(document.getElementById('hydrant-25').value) || 0;
    const hydr3  = parseInt(document.getElementById('hydrant-3').value) || 0;
    const hydr4  = parseInt(document.getElementById('hydrant-4').value) || 0;

    const length = parseFloat(document.getElementById('section-length').value) || 0;
    const width  = parseFloat(document.getElementById('section-width').value) || 0;
    const perimeter = 2 * (length + width);

    const totalHydr25Eq = hydr25 + (hydr3 * 2) + (hydr4 * 3);
    const requiredHydrants = Math.ceil(perimeter / 50);

    if (requiredHydrants > 0) {
        if (totalHydr25Eq >= requiredHydrants) details.w4 = 0;
        else if (totalHydr25Eq >= requiredHydrants * 0.75) details.w4 = 1;
        else if (totalHydr25Eq >= requiredHydrants * 0.5) details.w4 = 2;
        else details.w4 = 3;
    } else {
        details.w4 = 0; // محیط کوچک → نیاز صفر
    }
    w += details.w4;

    // محاسبه W نهایی
    calculationResults.W = Math.pow(0.95, w);

    // نمایس جزئیات زنده
    const detailsText = `
        <div>(w=${w} = w₁:${details.w1} + w₂:${details.w2} + w₃:${details.w3} + w₄:${details.w4})</div>
        <div style="font-size:0.9em;color:#555;margin-top:5px;">
            محیط: ${perimeter.toFixed(2)} متر<br>
            هیدرانت لازم: ${requiredHydrants} عدد<br>
            هیدرانت معادل واقعی: ${totalHydr25Eq} عدد
        </div>
    `;

    updateDisplay('W-result', 'W', calculationResults.W, detailsText);
}



// ✅ Export برای استفاده در جاهای دیگر
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculateW, calculateW2015 };
}

// وصل کردن ورودی‌ها برای محاسبه زنده
['section-length','section-width','hydrant-25','hydrant-3','hydrant-4',
 'water-storage-type','qi','qm','water-capacity','distribution-network'
].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', calculateW2015);
});





// تابع به‌روزرسانی نمایش (اگر قبلاً تعریف نشده)
function updateDisplay(elementId, label, value, details = '') {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `
            <div class="result-value">${label} = ${value.toFixed(3)}</div>
            ${details ? `<div class="result-details">${details}</div>` : ''}
        `;
        element.style.display = 'block';
    }
}

// تابع نمایش پیام (اگر قبلاً تعریف نشده)
function showMessage(type, message) {
    console.log(`${type}: ${message}`);
    // می‌توانید کد نمایش پیام را اینجا اضافه کنید
}

// تابع بررسی و محاسبه D (اگر قبلاً تعریف نشده)
function checkAndCalculateD() {
    // بررسی و محاسبه خودکار D
    console.log('Checking to calculate D...');
}


// توابع کمکی برای نمایش مقادیر فردی
function getW1Value(storageType) {
    switch(storageType) {
        case 'auto-mixed': return 0;
        case 'manual-mixed': return 4;
        case 'none': return 10;
        default: return 0;
    }
}

function getW2Value(shortage) {
    if (shortage <= 0) return 0;
    if (shortage <= 10) return 1;
    if (shortage <= 20) return 2;
    if (shortage <= 30) return 3;
    return 4;
}

function getW3Value(network) {
    switch(network) {
        case 'adequate': return 0;
        case 'small': return 2;
        case 'none': return 6;
        default: return 0;
    }
}

function getW4Value(ratio) {
    if (ratio >= 1/50) return 0;
    if (ratio >= 1/100) return 1;
    return 3;
}

function getW5Value(actual, required) {
    return actual >= required ? 0 : 3;
}




// محاسبه N - ضریب حفاظت عادی
function calculateN2015() {
    const n1 = parseInt(document.getElementById('n1').value) || 0;
    const n2 = parseInt(document.getElementById('n2').value) || 0;
    const n3 = parseInt(document.getElementById('n3').value) || 0;
    const n4 = parseInt(document.getElementById('n4').value) || 0;
    const n5 = parseInt(document.getElementById('n5').value) || 0;

    const n_total = n1 + n2 + n3 + n4 + n5;
    calculationResults.N = Math.pow(0.95, n_total);

    const details = `
       <div style="text-align:center">
    N = 0.95^${n_total} <br>
    (n₁=${n1}, n₂=${n2}, n₃=${n3}, n₄=${n4}, n₅=${n5})
    </div>
`;
updateDisplay('n-result', 'N', calculationResults.N, details);

    showNCalculationDetails2015(n1, n2, n3, n4, n5, n_total);
    checkAndCalculateD();
}

function showNCalculationDetails2015(n1, n2, n3, n4, n5, n_total) {
    const detailsDiv = document.getElementById('n-calculation-details');
    const contentDiv = document.getElementById('n-details-content');
    contentDiv.innerHTML = `
        <table class="details-table">
            <tr><th>عامل</th><th>مقدار</th></tr>
            <tr><td>n₁ - کشف و هشدار</td><td>${n1}</td></tr>
            <tr><td>n₂ - خاموش‌کن دستی</td><td>${n2}</td></tr>
            <tr><td>n₃ - جعبه آتش‌نشانی</td><td>${n3}</td></tr>
            <tr><td>n₄ - زمان مداخله</td><td>${n4}</td></tr>
            <tr><td>n₅ - آموزش ساکنان</td><td>${n5}</td></tr>
            <tr class="total-row">
                <td><strong>مجموع (n)</strong></td>
                <td><strong>${n_total}</strong></td>
            </tr>
            <tr>
                <td colspan="2"><strong>N = 0.95^${n_total} = ${calculationResults.N.toFixed(4)}</strong></td>
            </tr>
        </table>
        <div class="interpretation">${getNInterpretation(calculationResults.N)}</div>
    `;
    detailsDiv.style.display = 'block';
}

['n1','n2','n3','n4','n5'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', calculateN2015);
});





// محاسبه S - حفاظت ویژه
function calculateS() {
    // s1
    const s1 = parseFloat(document.getElementById('detection-type').value) || 0;
    // s2
    const s2 = parseFloat(document.getElementById('water-supply').value) || 0;
    // s3
    const s3 = parseFloat(document.getElementById('sprinkler-system').value) || 0;
    // s4
    const s4 = parseFloat(document.getElementById('fire-station').value) || 0;
    // s5
    const s5 = parseFloat(document.getElementById('industrial-brigade').value) || 0;

    // مجموع
    const s = s1 + s2 + s3 + s4 + s5;

    // محاسبه S
    calculationResults.S = Math.pow(1.05, s);

    // نمایش
updateDisplay('s-result', 'S', calculationResults.S, `
    <div style="text-align:center">
        S = 1.05<sup>${s}</sup> (s₁=${s1} ، s₂=${s2} ، s₃=${s3} ، s₄=${s4} ، s₅=${s5})
    </div>
`);



    checkAndCalculateD();
    showMessage('success', 'ضریب حفاظت ویژه (S) محاسبه شد');
}

function showSCalculationDetails(s1, s2, s3, s4, s5, s) {
    const detailsDiv = document.getElementById('s-calculation-details');
    const contentDiv = document.getElementById('s-details-content');
    let html = `
        <table class="details-table">
            <tr><th>عامل</th><th>مقدار</th><th>توضیح</th></tr>
            <tr><td>s₁</td><td>${s1}</td><td>سیستم تشخیص خودکار</td></tr>
            <tr><td>s₂</td><td>${s2}</td><td>منابع آب بهبود یافته</td></tr>
            <tr><td>s₃</td><td>${s3}</td><td>اسپرینکلر کل کمپارتمان</td></tr>
            <tr><td>s₄</td><td>${s4}</td><td>ایستگاه آتش‌نشانی پاسخگو</td></tr>
            <tr><td>s₅</td><td>${s5}</td><td>آتش‌نشانی صنعتی خصوصی</td></tr>
            <tr class="total-row">
                <td>مجموع s</td>
                <td>${s}</td>
                <td><strong>S = 1.05^${s} = ${calculationResults.S.toFixed(4)}</strong></td>
            </tr>
        </table>
    `;
    contentDiv.innerHTML = html;
    detailsDiv.style.display = 'block';
}



// محاسبه F - مقاومت آتش
function calculateF() {
    // دریافت مقادیر مقاومت آتش
    let fs = parseFloat(document.getElementById('fs-structural').value) || 0;
    let ff = parseFloat(document.getElementById('ff-facade').value) || 0;
    let fd = parseFloat(document.getElementById('fd-roof').value) || 0;
    let fw = parseFloat(document.getElementById('fw-walls').value) || 0;
    
    // بررسی شرایط خاص
    
    // اگر پنجره بیش از 5% باشد
    if (document.getElementById('facade-windows').checked) {
        ff = 0;
    }
    
    // اگر فضای باز بدون تقسیم‌بندی باشد
    if (document.getElementById('no-internal-separation').checked) {
        fw = 0;
    }
    
    // اگر عایق سوختنی داشته باشد
    if (document.getElementById('combustible-insulation').checked) {
        fd = 0;
    }
    
    // محدود کردن به 120 دقیقه
    fs = Math.min(fs, 120);
    ff = Math.min(ff, 120);
    fd = Math.min(fd, 120);
    fw = Math.min(fw, 120);
    
    // هیچ بخشی نمی‌تواند از مقاومت سازه بیشتر باشد
    ff = Math.min(ff, fs);
    fd = Math.min(fd, fs);
    fw = Math.min(fw, fs);
    
    // محاسبه میانگین وزنی مقاومت آتش
    const f = (1/2) * fs + (1/4) * ff + (1/8) * fd + (1/8) * fw;
    
    // دریافت مقدار S
    const S = parseFloat(document.getElementById('s-value-for-f').value) || 1;
    
    // محاسبه F با فرمول کامل
    const term1 = 1 + (f / 100) - (Math.pow(f, 2.5) / 1000000);
    const term2 = 1 - ((S - 1) / 40);
    
    calculationResults.F = term1 * term2;
    
    // محدود کردن مقدار نهایی
    calculationResults.F = Math.max(0.1, calculationResults.F);
    
    // نمایش نتیجه
const details = `
    <div style="text-align:center; line-height:1.8; font-weight:bold; color:#2196F3;">
        f = ${f.toFixed(1)} دقیقه<br>
        S = ${S.toFixed(3)}
    </div>
`;
updateDisplay('f-result', 'F', calculationResults.F, details);

    
    // نمایش جزئیات محاسبه
    showFCalculationDetails(fs, ff, fd, fw, f, S);
    
    checkAndCalculateD();
    showMessage('success', 'ضریب مقاومت آتش (F) محاسبه شد');
}

// نمایش جزئیات محاسبه F
function showFCalculationDetails(fs, ff, fd, fw, f, S) {
    const detailsDiv = document.getElementById('f-calculation-details');
    const contentDiv = document.getElementById('f-details-content');
    
    const term1 = 1 + (f / 100) - (Math.pow(f, 2.5) / 1000000);
    const term2 = 1 - ((S - 1) / 40);
    
    let html = `
        <table class="details-table">
            <tr>
                <th>جزء</th>
                <th>مقاومت (دقیقه)</th>
                <th>ضریب</th>
                <th>سهم در میانگین</th>
            </tr>
            <tr>
                <td>سازه (f<sub>s</sub>)</td>
                <td>${fs}</td>
                <td>1/2</td>
                <td>${(0.5 * fs).toFixed(1)}</td>
            </tr>
            <tr>
                <td>دیوار خارجی (f<sub>f</sub>)</td>
                <td>${ff}</td>
                <td>1/4</td>
                <td>${(0.25 * ff).toFixed(1)}</td>
            </tr>
            <tr>
                <td>سقف/بام (f<sub>d</sub>)</td>
                <td>${fd}</td>
                <td>1/8</td>
                <td>${(0.125 * fd).toFixed(1)}</td>
            </tr>
            <tr>
                <td>دیوار داخلی (f<sub>w</sub>)</td>
                <td>${fw}</td>
                <td>1/8</td>
                <td>${(0.125 * fw).toFixed(1)}</td>
            </tr>
            <tr class="total-row">
                <td colspan="3"><strong>میانگین وزنی (f)</strong></td>
                <td><strong>${f.toFixed(1)}</strong></td>
            </tr>
        </table>
        
        <div class="calculation-steps">
            <h5>مراحل محاسبه F:</h5>
            <p>1. محاسبه بخش اول: [1 + f/100 - f<sup>2.5</sup>/10<sup>6</sup>] = ${term1.toFixed(4)}</p>
            <p>2. محاسبه بخش دوم: [1 - (S-1)/40] = ${term2.toFixed(4)}</p>
            <p>3. ضریب نهایی: F = ${term1.toFixed(4)} × ${term2.toFixed(4)} = <strong>${calculationResults.F.toFixed(4)}</strong></p>
        </div>
        
        ${calculationResults.F < 1 ? '<p class="warning">⚠️ توجه: F < 1 نشان‌دهنده مقاومت آتش ناکافی است!</p>' : ''}
    `;
    
    contentDiv.innerHTML = html;
    detailsDiv.style.display = 'block';
}

// به‌روزرسانی خودکار S در محاسبه F
document.addEventListener('DOMContentLoaded', function() {
    // اگر S محاسبه شده باشد، در فرم F نمایش داده شود
    if (calculationResults.S) {
        const sInput = document.getElementById('s-value-for-f');
        if (sInput) {
            sInput.value = calculationResults.S.toFixed(3);
        }
    }
});


// محاسبه U - فرار و نجات
// محاسبه U - FRAME 2015
function calculateU() {
    let u = 0;

    // جمع امتیازها بر اساس انتخاب کاربر
    u += parseFloat(document.getElementById('u-subcompartment').value) || 0;
    u += parseFloat(document.getElementById('u-stair-type').value) || 0;
    u += parseFloat(document.getElementById('u-horizontal-exit').value) || 0;
    u += parseFloat(document.getElementById('u-sprinkler').value) || 0;

    // فرمول نهایی U
    const U = Math.pow(1.05, u);
    calculationResults.U = U;

    // نمایش خروجی وسط‌چین
    const details = `
        <div style="text-align:center;line-height:1.8;font-weight:bold;color:#2196F3;">
            u = ${u.toFixed(1)}<br>
        </div>
    `;
    updateDisplay('u-result', 'U', U, details);

    showMessage('success', 'ضریب فرار و نجات (U) محاسبه شد');
    checkAndCalculateD();
}



// محاسبه Y - نجات اموال
function calculateY() {
    let sumY = 0;

    // حفاظت فیزیکی
    const physicalProtection = [
        'sub-compartment-ei30',
        'sub-compartment-ei60',
        'partial-detection-critical',
        'partial-sprinkler-critical',
        'other-auto-extinguish'
    ];

    // برنامه‌ریزی بحران
    const disasterPlanning = [
        'financial-data-backup',
        'spare-parts-access',
        'self-repair-capability',
        'relocation-agreements',
        'multiple-production'
    ];

    [...physicalProtection, ...disasterPlanning].forEach(id => {
        const el = document.getElementById(id);
        if (el && el.type === 'checkbox' && el.checked) {
            sumY += parseFloat(el.value);
        }
    });

    // محاسبه بر اساس FRAME 2015 (نمای مثبت)
    calculationResults.Y = Math.pow(1.05, sumY);

    updateDisplay('y-result', 'Y', calculationResults.Y,
        `<div style="margin-top:0.4em;color:#607d8b;">(مجموع امتیازات y = ${sumY})</div>`
    );
    showMessage('success', `ضریب نجات اموال محاسبه شد (y = ${sumY})`);
    checkAndCalculateD();
}



// محاسبه مجموع D
function calculateTotalD() {
    const res = calculationResults;
    
    if (res.W && res.N && res.S && res.F) {
        res.D = res.W * res.N * res.S * res.F;
        updateDisplay('total-d', 'D', res.D);
    }
    
    if (res.N && res.U) {
        res.D1 = res.N * res.U;
        updateDisplay('total-d1', 'D₁', res.D1);
    }
    
    if (res.W && res.N && res.S && res.Y) {
        res.D2 = res.W * res.N * res.S * res.Y;
        updateDisplay('total-d2', 'D₂', res.D2);
    }
    
    showMessage('success', 'سطوح حفاظت محاسبه شدند');
    checkAndCalculateFinalRisk();
}

// بررسی و محاسبه خودکار D
function checkAndCalculateD() {
    const res = calculationResults;
    if (res.W && res.N && res.S && res.F && res.U && res.Y) {
        calculateTotalD();
    }
}
 

// اضافه کردن به انتهای فایل script.js

// محاسبه F₀ - ضریب مقاومت سازه اولیه
function calculateFo() {
    const fsValue = parseFloat(document.getElementById('fire-resistance-initial')?.value);
    const fs = isNaN(fsValue) ? 60 : fsValue;

    // محدود کردن مقدار ورودی بر اساس استاندارد FRAME
    const fsClamped = Math.max(0, Math.min(fs, 120));

    // فرمول: F₀ = 1 + fs/100 - fs^2.5 / 10^6
    const term1 = fsClamped / 100;
    const term2 = Math.pow(fsClamped, 2.5) / 1_000_000;
    let Fo = 1 + term1 - term2;

    // محدود کردن خروجی بر اساس استاندارد FRAME
    if (!isFinite(Fo)) Fo = 1; // در صورت تقسیم بر صفر یا NaN
    return Math.max(0.5, Math.min(Fo, 2.0));
}


// محاسبه Ro - ریسک اولیه
function calculateInitialRisk() {
    const res = calculationResults;
    
    // بررسی وجود P و A
    if (!res.P || !res.A) {
        showMessage('error', 'ابتدا ریسک بالقوه (P) و سطح پذیرش (A) را محاسبه کنید');
        return;
    }
    
    const Fo = calculateFo();
    const Ro = res.P / (res.A * Fo);
    
    // ذخیره نتایج
    calculationResults.Fo = Fo;
    calculationResults.Ro = Ro;
    
    // نمایش نتایج
    document.getElementById('fo-result').textContent = Fo.toFixed(3);
    document.getElementById('ro-result').textContent = Ro.toFixed(3);
    
    // توصیه سیستم حفاظت
    displayProtectionRecommendation(Ro);
    
    showMessage('success', 'ریسک اولیه محاسبه شد');
}

// نمایش توصیه‌های حفاظتی
function displayProtectionRecommendation(Ro) {
    let recommendation = '';
    let colorClass = '';
    
    if (Ro < 1.0) {
        colorClass = 'green';
        recommendation = `
            <div class="recommendation-box ${colorClass}">
                <h4>✅ سطح ریسک: پایین (R₀ = ${Ro.toFixed(2)})</h4>
                <p><strong>سیستم حفاظت توصیه شده:</strong></p>
                <ul>
                    <li>سیستم‌های اطفاء دستی (کپسول و جعبه آتش‌نشانی)</li>
                    <li>آتش‌نشانی عمومی با منابع آب کافی</li>
                    <li>ممکن است نیاز به حفاظت اضافی برای افراد یا فعالیت‌ها باشد</li>
                </ul>
            </div>
        `;
    } else if (Ro < 1.6) {
        colorClass = 'yellow';
        recommendation = `
            <div class="recommendation-box ${colorClass}">
                <h4>⚠️ سطح ریسک: متوسط (R₀ = ${Ro.toFixed(2)})</h4>
                <p><strong>سیستم حفاظت توصیه شده:</strong></p>
                <ul>
                    <li>سیستم اعلام حریق اتوماتیک عمومی</li>
                    <li>هشدار سریع و واکنش سریع آتش‌نشانی</li>
                    <li>منابع آب کافی ضروری است</li>
                    <li>حفاظت اضافی برای افراد و فعالیت‌ها در نظر گرفته شود</li>
                </ul>
            </div>
        `;
    } else if (Ro < 4.5) {
        colorClass = Ro < 2.7 ? 'orange' : 'red';
        recommendation = `
            <div class="recommendation-box ${colorClass}">
                <h4>🔥 سطح ریسک: بالا (R₀ = ${Ro.toFixed(2)})</h4>
                <p><strong>سیستم حفاظت توصیه شده:</strong></p>
                <ul>
                    <li>سیستم اسپرینکلر ضروری است</li>
                    ${Ro > 2.7 ? '<li>بهبود قابلیت اطمینان منابع آب ضروری است</li>' : ''}
                    <li>معمولاً نیازی به حفاظت اضافی برای افراد نیست</li>
                    <li>ممکن است نیاز به حفاظت بیشتر برای فعالیت‌ها باشد</li>
                </ul>
            </div>
        `;
    } else {
        colorClass = 'dark-red';
        recommendation = `
            <div class="recommendation-box ${colorClass}">
                <h4>❌ سطح ریسک: بسیار بالا (R₀ = ${Ro.toFixed(2)})</h4>
                <p><strong>اقدامات ضروری:</strong></p>
                <ul>
                    <li><strong>کاهش ریسک با اقدامات پیشگیرانه ضروری است</strong></li>
                    <li>تقسیم‌بندی فضا (compartmentation)</li>
                    <li>جداسازی منابع آتش از مناطق ذخیره‌سازی</li>
                    <li>بهبود سیستم تهویه دود</li>
                    <li>بهبود دسترسی آتش‌نشانی</li>
                </ul>
            </div>
        `;
    }
    
    document.getElementById('protection-recommendation').innerHTML = recommendation;
}

// اضافه کردن به exports
window.calculateInitialRisk = calculateInitialRisk;


// =================== محاسبه ریسک نهایی ===================

function calculateFinalRisk() {
    const res = calculationResults;
    
    // بررسی وجود تمام مقادیر
    if (!res.P || !res.A || !res.D) {
        showMessage('error', 'لطفاً ابتدا تمام بخش‌ها را محاسبه کنید');
        return;
    }
    
    // محاسبه ریسک‌های نهایی
    res.R = res.P / (res.A * res.D);
    res.R1 = res.P1 / (res.A1 * res.D1);
    res.R2 = res.P2 / (res.A2 * res.D2);
    
    // نمایش نتایج
    updateRiskDisplay('final-risk-building', res.R);
    updateRiskDisplay('final-risk-people', res.R1);
    updateRiskDisplay('final-risk-activities', res.R2);
    
    showMessage('success', 'ریسک نهایی محاسبه شد');
}

// بررسی و محاسبه خودکار ریسک نهایی
function checkAndCalculateFinalRisk() {
    const res = calculationResults;
    if (res.P && res.A && res.D && res.P1 && res.A1 && res.D1 && res.P2 && res.A2 && res.D2) {
        calculateFinalRisk();
    }
}

// =================== توابع کمکی ===================

// به‌روزرسانی نمایش
function updateDisplay(elementId, label, value, extra = '') {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `
            <div class="result-value">
                ${label} = ${value.toFixed(3)}${extra}
            </div>
        `;
    }
}

// به‌روزرسانی نمایش ریسک
function updateRiskDisplay(elementId, value) {
    const element = document.getElementById(elementId);
    const statusElement = document.getElementById(elementId.replace('final-risk', 'status'));
    
    if (element) {
        element.textContent = `R = ${value.toFixed(3)}`;
        
        // تعیین وضعیت
        let status = '';
        let className = '';
        
        if (value <= 1) {
            status = '✅ قابل قبول';
            className = 'status-acceptable';
        } else if (value <= 1.6) {
            status = '⚠️ نیاز به بهبود';
            className = 'status-warning';
        } else {
            status = '❌ غیرقابل قبول';
            className = 'status-danger';
        }
        
        if (statusElement) {
            statusElement.textContent = status;
            statusElement.className = `result-status ${className}`;
        }
    }
}

// =================== گزارش‌گیری ===================

function generateReport() {
    const res = calculationResults;
    
    // بررسی کامل بودن محاسبات
    if (!res.R || !res.R1 || !res.R2) {
        showMessage('error', 'لطفاً ابتدا تمام محاسبات را انجام دهید');
        return;
    }
    
    // تولید خلاصه نتایج
    const summaryElement = document.getElementById('report-summary');
    if (summaryElement) {
        summaryElement.innerHTML = `
            <table class="report-table">
                <tr>
                    <th>پارامتر</th>
                    <th>ساختمان</th>
                    <th>افراد</th>
                    <th>فعالیت‌ها</th>
                </tr>
                <tr>
                    <td>ریسک بالقوه (P)</td>
                    <td>${res.P.toFixed(3)}</td>
                    <td>${res.P1.toFixed(3)}</td>
                    <td>${res.P2.toFixed(3)}</td>
                </tr>
                <tr>
                    <td>سطح پذیرش (A)</td>
                    <td>${res.A.toFixed(3)}</td>
                    <td>${res.A1.toFixed(3)}</td>
                    <td>${res.A2.toFixed(3)}</td>
                </tr>
                <tr>
                    <td>سطح حفاظت (D)</td>
                    <td>${res.D.toFixed(3)}</td>
                    <td>${res.D1.toFixed(3)}</td>
                    <td>${res.D2.toFixed(3)}</td>
                </tr>
                <tr class="report-highlight">
                    <td>ریسک نهایی (R)</td>
                    <td>${res.R.toFixed(3)}</td>
                    <td>${res.R1.toFixed(3)}</td>
                    <td>${res.R2.toFixed(3)}</td>
                </tr>
            </table>
        `;
    }
    
    // تولید توصیه‌ها
    generateRecommendations();
    
    showMessage('success', 'گزارش تولید شد');
}

function generateRecommendations() {
    const res = calculationResults;
    const recommendations = [];
    
    // بررسی ریسک‌ها و ارائه توصیه
    if (res.R > 1.6) {
        recommendations.push('⚠️ ریسک ساختمان در سطح غیرقابل قبول است. اقدامات فوری مورد نیاز است.');
    }
    
    if (res.R1 > 1.6) {
        recommendations.push('⚠️ ریسک افراد در سطح غیرقابل قبول است. بهبود سیستم‌های تخلیه ضروری است.');
    }
    
    if (res.R2 > 1.6) {
        recommendations.push('⚠️ ریسک فعالیت‌ها در سطح غیرقابل قبول است. بازنگری در فرآیندها لازم است.');
    }
    
    // توصیه‌های خاص
    if (res.q > 1.5) {
        recommendations.push('📌 بار آتش بالاست. کاهش مواد قابل احتراق را در نظر بگیرید.');
    }
    
    if (res.t > 0.3) {
        recommendations.push('📌 زمان تخلیه طولانی است. افزایش خروجی‌ها یا بهبود مسیرها توصیه می‌شود.');
    }
    
    if (res.W < 0.8) {
        recommendations.push('📌 سیستم‌های آب نیاز به تقویت دارند.');
    }
    
    const recommendationsElement = document.getElementById('report-recommendations');
    if (recommendationsElement) {
        recommendationsElement.innerHTML = recommendations.length > 0 
            ? `<ul>${recommendations.map(r => `<li>${r}</li>`).join('')}</ul>`
            : '<p>✅ وضعیت کلی قابل قبول است. به نگهداری و بازرسی‌های دوره‌ای ادامه دهید.</p>';
    }
}

function printReport() {
    window.print();
}

// تابع دانلود PDF
function exportPDF() {
    // بررسی وجود کتابخانه jsPDF
    if (typeof jspdf === 'undefined' || typeof html2canvas === 'undefined') {
        showMessage('error', 'کتابخانه PDF در حال بارگذاری است. لطفاً دوباره تلاش کنید.');
        return;
    }

    showMessage('info', 'در حال آماده‌سازی PDF... لطفاً صبر کنید');

    // جمع‌آوری اطلاعات پروژه
    const projectInfo = {
        name: document.getElementById('project-name').value || 'بدون نام',
        address: document.getElementById('project-address').value || '-',
        expert: document.getElementById('expert-name').value || '-',
        floor: document.getElementById('floor-name').value || '-',
        date: new Date().toLocaleDateString('fa-IR'),
        time: new Date().toLocaleTimeString('fa-IR')
    };

    // ایجاد PDF با jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    // تنظیم فونت فارسی (اگر لود شده باشد)
    try {
        doc.addFont('Vazir-normal.ttf', 'Vazir', 'normal');
        doc.setFont('Vazir');
    } catch(e) {
        console.log('فونت فارسی یافت نشد، از فونت پیش‌فرض استفاده می‌شود');
    }

    // تنظیمات اولیه
    doc.setFontSize(24);
    doc.setTextColor(76, 132, 198); // آبی
    
    // عنوان اصلی (راست چین)
    doc.text('گزارش ارزیابی ریسک حریق FRAME', 105, 30, { align: 'center' });
    
    // خط جدا کننده
    doc.setDrawColor(76, 132, 198);
    doc.line(20, 35, 190, 35);
    
    // اطلاعات پروژه
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    let y = 50;
    const rightX = 190; // موقعیت راست صفحه
    
    // اطلاعات پروژه (راست چین)
    doc.text(`نام پروژه: ${projectInfo.name}`, rightX, y, { align: 'right' });
    y += 10;
    doc.text(`آدرس: ${projectInfo.address}`, rightX, y, { align: 'right' });
    y += 10;
    doc.text(`کارشناس: ${projectInfo.expert}`, rightX, y, { align: 'right' });
    y += 10;
    doc.text(`طبقه/بخش: ${projectInfo.floor}`, rightX, y, { align: 'right' });
    y += 10;
    doc.text(`تاریخ: ${projectInfo.date} - ساعت: ${projectInfo.time}`, rightX, y, { align: 'right' });
    
    // خط جدا کننده
    y += 10;
    doc.line(20, y, 190, y);
    y += 15;
    
    // نتایج ریسک بالقوه
    doc.setFontSize(16);
    doc.setTextColor(76, 132, 198);
    doc.text('نتایج ریسک بالقوه (P)', rightX, y, { align: 'right' });
    y += 10;
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
  
    // =================== سیستم مقایسه طبقات ===================

// تابع افزودن داده‌های طبقه فعلی به لیست مقایسه
function addToComparison() {
    // بررسی وجود داده‌های محاسبه شده
    if (!calculationResults.P || !calculationResults.R) {
        showMessage('error', 'ابتدا محاسبات ریسک را کامل کنید');
        return;
    }
    
    // جمع‌آوری اطلاعات طبقه فعلی
    const floorData = {
        // اطلاعات پروژه
        projectName: document.getElementById('project-name').value || 'بدون نام',
        floorName: document.getElementById('floor-name').value || `طبقه ${Date.now()}`,
        date: new Date().toLocaleDateString('fa-IR'),
        time: new Date().toLocaleTimeString('fa-IR'),
        
        // نتایج محاسبات
        risks: {
            P: calculationResults.P,
            P1: calculationResults.P1,
            P2: calculationResults.P2,
            R: calculationResults.R,
            R1: calculationResults.R1,
            R2: calculationResults.R2
        },
        
        // جزئیات ضرایب
        factors: {
            q: calculationResults.q,
            i: calculationResults.i,
            g: calculationResults.g,
            e: calculationResults.e,
            v: calculationResults.v,
            z: calculationResults.z
        },
        
        // سطوح پذیرش و حفاظت
        levels: {
            A: calculationResults.A,
            A1: calculationResults.A1,
            A2: calculationResults.A2,
            D: calculationResults.D,
            D1: calculationResults.D1,
            D2: calculationResults.D2,
            W: calculationResults.W,
            N: calculationResults.N,
            S: calculationResults.S,
            F: calculationResults.F,
            U: calculationResults.U,
            Y: calculationResults.Y
        },
        
        // ذخیره مقادیر ورودی‌های مهم
        inputs: collectAllInputValues()
    };
    
    // بازیابی لیست طبقات ذخیره شده قبلی
    let comparisonList = JSON.parse(localStorage.getItem('frameFloorComparison') || '[]');
    
    // بررسی تکراری نبودن
    const exists = comparisonList.find(floor => 
        floor.projectName === floorData.projectName && 
        floor.floorName === floorData.floorName
    );
    
    if (exists) {
        if (confirm('اطلاعات این طبقه قبلاً ذخیره شده است. آیا می‌خواهید جایگزین شود؟')) {
            comparisonList = comparisonList.filter(floor => 
                !(floor.projectName === floorData.projectName && 
                  floor.floorName === floorData.floorName)
            );
        } else {
            return;
        }
    }
    
    // اضافه کردن به لیست
    comparisonList.push(floorData);
    
    // ذخیره در localStorage
    localStorage.setItem('frameFloorComparison', JSON.stringify(comparisonList));
    
    showMessage('success', `✅ طبقه "${floorData.floorName}" به لیست مقایسه اضافه شد`);
    
    // نمایش دکمه مشاهده مقایسه
    showComparisonButton();
}

// تابع جمع‌آوری تمام مقادیر ورودی
function collectAllInputValues() {
    const inputs = {};
    
    // جمع‌آوری تمام input ها
    document.querySelectorAll('input[type="number"], input[type="text"], select').forEach(element => {
        if (element.id && element.value) {
            inputs[element.id] = element.value;
        }
    });
    
    // جمع‌آوری checkbox ها
    document.querySelectorAll('input[type="checkbox"]').forEach(element => {
        if (element.id) {
            inputs[element.id] = element.checked;
        }
    });
    
    return inputs;
}

// نمایش دکمه مقایسه طبقات
function showComparisonButton() {
    const comparisonList = JSON.parse(localStorage.getItem('frameFloorComparison') || '[]');
    
    if (comparisonList.length > 0) {
        // اگر دکمه وجود ندارد، ایجاد کن
        if (!document.getElementById('floor-comparison-btn')) {
            const btnContainer = document.createElement('div');
            btnContainer.style.cssText = 'position: fixed; bottom: 20px; left: 20px; z-index: 1000;';
            btnContainer.innerHTML = `
                <button id="floor-comparison-btn" onclick="showFloorComparison()" class="btn btn-primary" style="padding: 15px 25px; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    📊 مشاهده مقایسه طبقات (${comparisonList.length})
                </button>
            `;
            document.body.appendChild(btnContainer);
        } else {
            // به‌روزرسانی تعداد
            document.getElementById('floor-comparison-btn').innerHTML = `📊 مشاهده مقایسه طبقات (${comparisonList.length})`;
        }
    }
}

// نمایش modal مقایسه طبقات
function showFloorComparison() {
    const comparisons = JSON.parse(localStorage.getItem('floorComparisons') || '[]');
    
    if (comparisons.length === 0) {
        showMessage('info', 'هیچ طبقه‌ای برای مقایسه ذخیره نشده است');
        return;
    }

    // ایجاد Modal
    const modalHtml = `
        <div id="comparison-modal" class="modal-bg" style="display: flex;">
            <div class="modal-guide" style="max-width: 90%; max-height: 90%;">
                <h2>📊 مقایسه طبقات (${comparisons.length} مورد)</h2>
                <div style="overflow-x: auto;">
                    <table class="comparison-table" style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: #f5f5f5;">
                                <th style="padding: 10px; border: 1px solid #ddd;">پروژه</th>
                                <th style="padding: 10px; border: 1px solid #ddd;">طبقه/بخش</th>
                                <th style="padding: 10px; border: 1px solid #ddd;">ریسک ساختمان</th>
                                <th style="padding: 10px; border: 1px solid #ddd;">ریسک افراد</th>
                                <th style="padding: 10px; border: 1px solid #ddd;">ریسک فعالیت</th>
                                <th style="padding: 10px; border: 1px solid #ddd;">تاریخ</th>
                                <th style="padding: 10px; border: 1px solid #ddd;">عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${comparisons.map((item, index) => `
                                <tr>
                                    <td style="padding: 8px; border: 1px solid #ddd;">${item.projectName}</td>
                                    <td style="padding: 8px; border: 1px solid #ddd;">${item.floorName}</td>
                                    <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">
                                        <span style="color: ${item.R < 1 ? 'green' : item.R < 1.6 ? 'orange' : 'red'}">
                                            ${item.R ? item.R.toFixed(2) : '-'}
                                        </span>
                                    </td>
                                    <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">
                                        <span style="color: ${item.R1 < 1 ? 'green' : item.R1 < 1.6 ? 'orange' : 'red'}">
                                            ${item.R1 ? item.R1.toFixed(2) : '-'}
                                        </span>
                                    </td>
                                    <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">
                                        <span style="color: ${item.R2 < 1 ? 'green' : item.R2 < 1.6 ? 'orange' : 'red'}">
                                            ${item.R2 ? item.R2.toFixed(2) : '-'}
                                        </span>
                                    </td>
                                    <td style="padding: 8px; border: 1px solid #ddd; font-size: 0.9em;">
                                        ${new Date(item.date).toLocaleDateString('fa-IR')}
                                    </td>
                                    <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">
                                        <button onclick="removeFromComparison(${index})" class="btn btn-sm btn-danger">حذف</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                <div style="margin-top: 20px; text-align: center;">
                    <button onclick="exportComparisonToExcel()" class="btn btn-success">دانلود Excel</button>
                    <button onclick="clearAllComparisons()" class="btn btn-danger">حذف همه</button>
                    <button onclick="document.getElementById('comparison-modal').remove()" class="btn btn-primary">بستن</button>
                </div>
            </div>
        </div>
    `;

    // حذف modal قبلی اگر وجود داشت
    const existingModal = document.getElementById('comparison-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // اضافه کردن modal جدید
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// توابع کمکی
function removeFromComparison(index) {
    const comparisons = JSON.parse(localStorage.getItem('floorComparisons') || '[]');
    comparisons.splice(index, 1);
    localStorage.setItem('floorComparisons', JSON.stringify(comparisons));
    updateComparisonCount();
    
    // بازسازی modal
    showFloorComparison();
}

function clearAllComparisons() {
    if (confirm('آیا از حذف همه مقایسه‌ها اطمینان دارید؟')) {
        localStorage.removeItem('floorComparisons');
        updateComparisonCount();
        document.getElementById('comparison-modal').remove();
        showMessage('success', 'همه مقایسه‌ها حذف شدند');
    }
}

function exportComparisonToExcel() {
    const comparisons = JSON.parse(localStorage.getItem('floorComparisons') || '[]');
    
    // ایجاد CSV
    let csv = 'پروژه,طبقه,ریسک ساختمان,ریسک افراد,ریسک فعالیت,تاریخ\n';
    comparisons.forEach(item => {
        csv += `"${item.projectName}","${item.floorName}",${item.R || ''},${item.R1 || ''},${item.R2 || ''},"${new Date(item.date).toLocaleDateString('fa-IR')}"\n`;
    });
    
    // دانلود فایل
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `مقایسه_طبقات_${new Date().toLocaleDateString('fa-IR')}.csv`;
    link.click();
}

// اضافه کردن به window
window.showFloorComparison = showFloorComparison;
window.removeFromComparison = removeFromComparison;
window.clearAllComparisons = clearAllComparisons;
window.exportComparisonToExcel = exportComparisonToExcel;


// تابع دریافت رنگ بر اساس سطح ریسک
function getRiskColor(risk) {
    if (!risk) return '#95a5a6';
    if (risk <= 1) return '#27ae60';
    if (risk <= 1.6) return '#f39c12';
    return '#e74c3c';
}

// تابع دریافت وضعیت ریسک
function getRiskStatus(risk) {
    if (!risk) return '-';
    if (risk <= 1) return '✅ قابل قبول';
    if (risk <= 1.6) return '⚠️ نیاز به بهبود';
    return '❌ غیرقابل قبول';
}

// نمایش جزئیات طبقه
function viewFloorDetails(index) {
    const comparisonList = JSON.parse(localStorage.getItem('frameFloorComparison') || '[]');
    const floor = comparisonList[index];
    
    if (!floor) return;
    
    const detailModal = document.createElement('div');
    detailModal.className = 'detail-modal';
    detailModal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        width: 80%;
        max-width: 800px;
        max-height: 80vh;
        overflow-y: auto;
        border-radius: 10px;
        padding: 30px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 3000;
    `;
    
    detailModal.innerHTML = `
        <h3>جزئیات طبقه: ${floor.floorName} - ${floor.projectName}</h3>
        
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 20px;">
            <div style="background: #f8f9fa; padding: 15px; border-radius: 5px;">
                <h4>ضرایب ریسک بالقوه</h4>
                <p>q (بار آتش): ${floor.factors.q?.toFixed(2) || '-'}</p>
                <p>i (گسترش): ${floor.factors.i?.toFixed(2) || '-'}</p>
                <p>g (سطح): ${floor.factors.g?.toFixed(2) || '-'}</p>
                <p>e (طبقه): ${floor.factors.e?.toFixed(2) || '-'}</p>
                <p>v (تهویه): ${floor.factors.v?.toFixed(2) || '-'}</p>
                <p>z (دسترسی): ${floor.factors.z?.toFixed(2) || '-'}</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 15px; border-radius: 5px;">
                <h4>سطوح حفاظت</h4>
                <p>W (آب): ${floor.levels.W?.toFixed(2) || '-'}</p>
                <p>N (عادی): ${floor.levels.N?.toFixed(2) || '-'}</p>
                <p>S (ویژه): ${floor.levels.S?.toFixed(2) || '-'}</p>
                <p>F (مقاومت): ${floor.levels.F?.toFixed(2) || '-'}</p>
                <p>U (تخلیه): ${floor.levels.U?.toFixed(2) || '-'}</p>
                <p>Y (نجات): ${floor.levels.Y?.toFixed(2) || '-'}</p>
            </div>
        </div>
        
        <button onclick="this.parentElement.remove()" style="margin-top: 20px; background: #e74c3c; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">بستن</button>
    `;
    
    document.body.appendChild(detailModal);
}

// حذف طبقه از لیست مقایسه
function removeFromComparison(index) {
    if (confirm('آیا از حذف این طبقه اطمینان دارید؟')) {
        let comparisonList = JSON.parse(localStorage.getItem('frameFloorComparison') || '[]');
        comparisonList.splice(index, 1);
        localStorage.setItem('frameFloorComparison', JSON.stringify(comparisonList));
        
        // بستن modal و نمایش مجدد
        document.querySelector('.comparison-modal')?.remove();
        
        if (comparisonList.length > 0) {
            showFloorComparison();
        } else {
            document.getElementById('floor-comparison-btn')?.parentElement.remove();
            showMessage('info', 'لیست مقایسه خالی شد');
        }
    }
}

// پاک کردن کل لیست مقایسه
function clearComparison() {
    if (confirm('آیا از پاک کردن تمام طبقات ذخیره شده اطمینان دارید؟')) {
        localStorage.removeItem('frameFloorComparison');
        document.querySelector('.comparison-modal')?.remove();
        document.getElementById('floor-comparison-btn')?.parentElement.remove();
        showMessage('success', 'لیست مقایسه پاک شد');
    }
}

// خروجی Excel ساده
function exportComparisonExcel() {
    const comparisonList = JSON.parse(localStorage.getItem('frameFloorComparison') || '[]');
    
    if (comparisonList.length === 0) {
        showMessage('error', 'داده‌ای برای خروجی وجود ندارد');
        return;
    }
    
    // ایجاد محتوای CSV
    let csv = '\ufeff'; // BOM for UTF-8
    csv += 'پروژه,طبقه,تاریخ,P,R,R1,R2,q,i,g,e,v,z,W,N,S,F,U,Y,وضعیت\n';
    
    comparisonList.forEach(floor => {
        csv += `"${floor.projectName}","${floor.floorName}","${floor.date}",`;
        csv += `${floor.risks.P?.toFixed(2) || '-'},${floor.risks.R?.toFixed(2) || '-'},`;
        csv += `${floor.risks.R1?.toFixed(2) || '-'},${floor.risks.R2?.toFixed(2) || '-'},`;
        csv += `${floor.factors.q?.toFixed(2) || '-'},${floor.factors.i?.toFixed(2) || '-'},`;
        csv += `${floor.factors.g?.toFixed(2) || '-'},${floor.factors.e?.toFixed(2) || '-'},`;
        csv += `${floor.factors.v?.toFixed(2) || '-'},${floor.factors.z?.toFixed(2) || '-'},`;
        csv += `${floor.levels.W?.toFixed(2) || '-'},${floor.levels.N?.toFixed(2) || '-'},`;
        csv += `${floor.levels.S?.toFixed(2) || '-'},${floor.levels.F?.toFixed(2) || '-'},`;
        csv += `${floor.levels.U?.toFixed(2) || '-'},${floor.levels.Y?.toFixed(2) || '-'},`;
        csv += `"${getRiskStatus(floor.risks.R)}"\n`;
    });
    
    // دانلود فایل
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `FRAME_Comparison_${new Date().toLocaleDateString('fa-IR')}.csv`;
    link.click();
    
    showMessage('success', 'فایل Excel با موفقیت دانلود شد');
}

// رسم نمودار مقایسه (نیاز به Chart.js)
function drawRiskChart(comparisonList) {
    const canvas = document.getElementById('riskChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // داده‌های نمودار
    const labels = comparisonList.map(f => f.floorName);
    const dataR = comparisonList.map(f => f.risks.R || 0);
    const dataR1 = comparisonList.map(f => f.risks.R1 || 0);
    const dataR2 = comparisonList.map(f => f.risks.R2 || 0);
    
    // رسم ساده نمودار (برای نمودار حرفه‌ای از Chart.js استفاده کنید)
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const barWidth = (width - 2 * padding) / (labels.length * 3 + labels.length - 1);
    const maxValue = Math.max(...dataR, ...dataR1, ...dataR2, 2);
    
    ctx.clearRect(0, 0, width, height);
    
    // رسم محورها
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
    
    // رسم خط قرمز در R=1.6
    ctx.strokeStyle = 'red';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    const y16 = height - padding - (1.6 / maxValue) * (height - 2 * padding);
    ctx.moveTo(padding, y16);
    ctx.lineTo(width - padding, y16);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // رسم میله‌ها
    labels.forEach((label, i) => {
        const x = padding + i * (3 * barWidth + barWidth);
        
        // R
        ctx.fillStyle = '#3498db';
        const hR = (dataR[i] / maxValue) * (height - 2 * padding);
        ctx.fillRect(x, height - padding - hR, barWidth, hR);
        
        // R1
        ctx.fillStyle = '#e74c3c';
        const hR1 = (dataR1[i] / maxValue) * (height - 2 * padding);
        ctx.fillRect(x + barWidth, height - padding - hR1, barWidth, hR1);
        
        // R2
        ctx.fillStyle = '#f39c12';
        const hR2 = (dataR2[i] / maxValue) * (height - 2 * padding);
        ctx.fillRect(x + 2 * barWidth, height - padding - hR2, barWidth, hR2);
        
        // برچسب
        ctx.fillStyle = 'black';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(label, x + 1.5 * barWidth, height - padding + 20);
    });
    
    // راهنما
    ctx.font = '14px Arial';
    ctx.fillStyle = '#3498db';
    ctx.fillRect(width - 150, 20, 20, 20);
    ctx.fillStyle = 'black';
    ctx.fillText('R (ساختمان)', width - 120, 35);
    
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(width - 150, 50, 20, 20);
    ctx.fillStyle = 'black';
    ctx.fillText('R1 (افراد)', width - 120, 65);
    
    ctx.fillStyle = '#f39c12';
    ctx.fillRect(width - 150, 80, 20, 20);
    ctx.fillStyle = 'black';
    ctx.fillText('R2 (فعالیت)', width - 120, 95);
}

// تابع جمع‌آوری کامل داده‌های طبقه برای Excel جامع
function collectAllFloorData() {
    const inputs = collectAllInputValues();
    
    return {
        // اطلاعات کلی
        projectInfo: {
            projectName: document.getElementById('project-name')?.value || 'بدون نام',
            floorName: document.getElementById('floor-name')?.value || 'بدون نام',
            date: new Date().toLocaleDateString('fa-IR'),
            time: new Date().toLocaleTimeString('fa-IR')
        },
        
        // ریسک بالقوه
        potentialRiskFactors: {
            q: {
                value: calculationResults.q,
                inputs: {
                    qi: inputs['qi'],
                    qm: inputs['qm']
                }
            },
            i: {
                value: calculationResults.i,
                inputs: {
                    tempDestruction: inputs['temp-destruction'],
                    avgDimension: inputs['avg-dimension'],
                    fireClass: inputs['fire-class']
                }
            },
            g: {
                value: calculationResults.g,
                inputs: {
                    length: inputs['section-length'],
                    width: inputs['section-width'],
                    area: inputs['section-area'],
                    accessType: inputs['access-type']
                }
            },
            e: {
                value: calculationResults.e,
                inputs: {
                    floorE: inputs['floor-E']
                }
            },
            v: {
                value: calculationResults.v,
                inputs: {
                    ventingRatio: inputs['venting-ratio']
                }
            },
            z: {
                value: calculationResults.z,
                inputs: {
                    accessDifficulty: inputs['access-difficulty'],
                    accessWidth: inputs['access-width']
                }
            }
        },
        
        // سطوح پذیرش
        acceptanceLevels: {
            a: calculationResults.a,
            t: calculationResults.t,
            c: calculationResults.c,
            r: calculationResults.r,
            d: calculationResults.d
        },
        
        // سطوح حفاظت
        protectionLevels: {
            W: calculationResults.W,
            N: calculationResults.N,
            S: calculationResults.S,
            F: calculationResults.F,
            U: calculationResults.U,
            Y: calculationResults.Y
        },
        
        // نتایج نهایی
        results: {
            P: calculationResults.P,
            P1: calculationResults.P1,
            P2: calculationResults.P2,
            A: calculationResults.A,
            A1: calculationResults.A1,
            A2: calculationResults.A2,
            D: calculationResults.D,
            D1: calculationResults.D1,
            D2: calculationResults.D2,
            R: calculationResults.R,
            R1: calculationResults.R1,
            R2: calculationResults.R2
        },
        
        // تمام ورودی‌ها
        allInputs: inputs
    };
}

// تابع اصلی خروجی Excel جامع
function exportComprehensiveExcel() {
    const comparisonList = JSON.parse(localStorage.getItem('frameFloorComparison') || '[]');
    
    if (comparisonList.length === 0) {
        showMessage('error', 'هیچ طبقه‌ای برای خروجی وجود ندارد');
        return;
    }
    
    // برای ساخت Excel واقعی، نیاز به کتابخانه مثل SheetJS دارید
    // در اینجا یک CSV جامع می‌سازیم
    
    let csvContent = '\ufeff'; // BOM
    
    // شیت 1: خلاصه مقایسه
    csvContent += 'شیت 1: خلاصه مقایسه طبقات\n\n';
    csvContent += 'پروژه,طبقه,تاریخ,P,R,R1,R2,وضعیت کلی\n';
    
    comparisonList.forEach(floor => {
        csvContent += `"${floor.projectName}","${floor.floorName}","${floor.date}",`;
        csvContent += `${floor.risks.P?.toFixed(2) || '-'},`;
        csvContent += `${floor.risks.R?.toFixed(2) || '-'},`;
        csvContent += `${floor.risks.R1?.toFixed(2) || '-'},`;
        csvContent += `${floor.risks.R2?.toFixed(2) || '-'},`;
        csvContent += `"${getRiskStatus(floor.risks.R)}"\n`;
    });
    
    csvContent += '\n\n';
    
    // شیت 2: جزئیات ضرایب
    csvContent += 'شیت 2: جزئیات ضرایب تمام طبقات\n\n';
    csvContent += 'طبقه,q,i,g,e,v,z,W,N,S,F,U,Y,A,A1,A2,D,D1,D2\n';
    
    comparisonList.forEach(floor => {
        csvContent += `"${floor.floorName}",`;
        csvContent += `${floor.factors.q?.toFixed(3) || '-'},`;
        csvContent += `${floor.factors.i?.toFixed(3) || '-'},`;
        csvContent += `${floor.factors.g?.toFixed(3) || '-'},`;
        csvContent += `${floor.factors.e?.toFixed(3) || '-'},`;
        csvContent += `${floor.factors.v?.toFixed(3) || '-'},`;
        csvContent += `${floor.factors.z?.toFixed(3) || '-'},`;
        csvContent += `${floor.levels.W?.toFixed(3) || '-'},`;
        csvContent += `${floor.levels.N?.toFixed(3) || '-'},`;
        csvContent += `${floor.levels.S?.toFixed(3) || '-'},`;
        csvContent += `${floor.levels.F?.toFixed(3) || '-'},`;
        csvContent += `${floor.levels.U?.toFixed(3) || '-'},`;
        csvContent += `${floor.levels.Y?.toFixed(3) || '-'},`;
        csvContent += `${floor.levels.A?.toFixed(3) || '-'},`;
        csvContent += `${floor.levels.A1?.toFixed(3) || '-'},`;
        csvContent += `${floor.levels.A2?.toFixed(3) || '-'},`;
        csvContent += `${floor.levels.D?.toFixed(3) || '-'},`;
        csvContent += `${floor.levels.D1?.toFixed(3) || '-'},`;
        csvContent += `${floor.levels.D2?.toFixed(3) || '-'}\n`;
    });
    
    csvContent += '\n\n';
    
    // شیت 3: توصیه‌ها
    csvContent += 'شیت 3: توصیه‌های بهبود\n\n';
    csvContent += 'طبقه,توصیه\n';
    
    comparisonList.forEach(floor => {
        const recommendations = generateRecommendations(floor);
        recommendations.forEach(rec => {
            csvContent += `"${floor.floorName}","${rec}"\n`;
        });
    });
    
    // دانلود فایل
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `FRAME_Comprehensive_Analysis_${new Date().toLocaleDateString('fa-IR').replace(/\//g, '-')}.csv`;
    link.click();
    
    showMessage('success', '✅ فایل Excel جامع با موفقیت ایجاد شد');
}

// تولید توصیه‌های بهبود برای هر طبقه
function generateRecommendations(floor) {
    const recommendations = [];
    
    // بررسی ریسک کلی
    if (floor.risks.R > 1.6) {
        recommendations.push('ریسک کلی در سطح غیرقابل قبول - نیاز به اقدام فوری');
    } else if (floor.risks.R > 1) {
        recommendations.push('ریسک کلی نیاز به بهبود دارد');
    }
    
    // بررسی ضرایب
    if (floor.factors.q > 1.5) {
        recommendations.push('بار آتش بالا - کاهش مواد قابل احتراق توصیه می‌شود');
    }
    
    if (floor.factors.v < 0.5) {
        recommendations.push('تهویه ضعیف - بهبود سیستم تهویه و افزایش بازشوها');
    }
    
    if (floor.levels.W < 0.7) {
        recommendations.push('سیستم آب ضعیف - تقویت شبکه آبرسانی آتش‌نشانی');
    }
    
    if (floor.levels.U < 0.8) {
        recommendations.push('سیستم تخلیه نیاز به بهبود - افزایش خروجی‌ها یا بهبود علائم');
    }
    
    return recommendations.length > 0 ? recommendations : ['وضعیت قابل قبول - ادامه نگهداری منظم'];
}

// بارگذاری اولیه در صفحه
document.addEventListener('DOMContentLoaded', function() {
    // نمایش دکمه مقایسه اگر داده‌ای وجود دارد
    showComparisonButton();
});

// اضافه کردن به لیست توابع global
window.addToComparison = addToComparison;
window.showFloorComparison = showFloorComparison;
window.viewFloorDetails = viewFloorDetails;
window.removeFromComparison = removeFromComparison;
window.clearComparison = clearComparison;
window.exportComparisonExcel = exportComparisonExcel;
window.exportComprehensiveExcel = exportComprehensiveExcel;


    // جدول نتایج ریسک بالقوه
    const pResults = [
        ['ضریب بار آتش (q)', calculationResults.q?.toFixed(2) || '-'],
        ['ضریب گسترش (i)', calculationResults.i?.toFixed(2) || '-'],
        ['ضریب سطح (g)', calculationResults.g?.toFixed(2) || '-'],
        ['ضریب طبقه (e)', calculationResults.e?.toFixed(2) || '-'],
        ['ضریب تهویه (v)', calculationResults.v?.toFixed(2) || '-'],
        ['ضریب دسترسی (z)', calculationResults.z?.toFixed(2) || '-'],
        ['', ''],
        ['ریسک بالقوه ساختمان (P)', calculationResults.P?.toFixed(2) || '-'],
        ['ریسک بالقوه افراد (P1)', calculationResults.P1?.toFixed(2) || '-'],
        ['ریسک بالقوه فعالیت (P2)', calculationResults.P2?.toFixed(2) || '-']
    ];
    
    pResults.forEach(row => {
        if (row[0]) {
            doc.text(row[1], rightX - 50, y, { align: 'right' });
            doc.text(row[0], rightX, y, { align: 'right' });
            y += 8;
        } else {
            y += 4; // فاصله خالی
        }
    });
    
    // صفحه جدید برای نتایج نهایی
    doc.addPage();
    y = 30;
    
    // نتایج نهایی
    doc.setFontSize(16);
    doc.setTextColor(76, 132, 198);
    doc.text('نتایج نهایی ریسک', rightX, y, { align: 'right' });
    y += 15;
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    // جدول نتایج نهایی
    const finalResults = [
        ['سطح پذیرش ساختمان (A)', calculationResults.A?.toFixed(2) || '-'],
        ['سطح پذیرش افراد (A1)', calculationResults.A1?.toFixed(2) || '-'],
        ['سطح پذیرش فعالیت (A2)', calculationResults.A2?.toFixed(2) || '-'],
        ['', ''],
        ['سطح حفاظت ساختمان (D)', calculationResults.D?.toFixed(2) || '-'],
        ['سطح حفاظت افراد (D1)', calculationResults.D1?.toFixed(2) || '-'],
        ['سطح حفاظت فعالیت (D2)', calculationResults.D2?.toFixed(2) || '-'],
        ['', ''],
        ['ریسک نهایی ساختمان (R)', calculationResults.R?.toFixed(2) || '-'],
        ['ریسک نهایی افراد (R1)', calculationResults.R1?.toFixed(2) || '-'],
        ['ریسک نهایی فعالیت (R2)', calculationResults.R2?.toFixed(2) || '-']
    ];
    
    finalResults.forEach(row => {
        if (row[0]) {
            // رنگ‌بندی بر اساس مقدار ریسک نهایی
            if (row[0].includes('ریسک نهایی')) {
                const value = parseFloat(row[1]);
                if (!isNaN(value)) {
                    if (value <= 1) {
                        doc.setTextColor(0, 128, 0); // سبز
                    } else if (value <= 1.6) {
                        doc.setTextColor(255, 140, 0); // نارنجی
                    } else {
                        doc.setTextColor(255, 0, 0); // قرمز
                    }
                }
            }
            
            doc.text(row[1], rightX - 50, y, { align: 'right' });
            doc.setTextColor(0, 0, 0); // بازگشت به رنگ مشکی
            doc.text(row[0], rightX, y, { align: 'right' });
            y += 8;
        } else {
            y += 4;
        }
    });
    
    // تفسیر نتایج
    y += 10;
    doc.setFontSize(14);
    doc.setTextColor(76, 132, 198);
    doc.text('تفسیر نتایج', rightX, y, { align: 'right' });
    y += 10;
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    
    // تفسیر برای هر ریسک
    const interpretations = [];
    
    if (calculationResults.R) {
        const r = calculationResults.R;
        let status = '';
        let color = [0, 0, 0];
        
        if (r <= 1) {
            status = 'قابل قبول ✓';
            color = [0, 128, 0];
        } else if (r <= 1.6) {
            status = 'نیاز به بهبود ⚠';
            color = [255, 140, 0];
        } else {
            status = 'غیرقابل قبول ✗';
            color = [255, 0, 0];
        }
        
        doc.setTextColor(...color);
        doc.text(`ریسک ساختمان: ${status}`, rightX, y, { align: 'right' });
        y += 8;
    }
    
    if (calculationResults.R1) {
        const r1 = calculationResults.R1;
        let status = '';
        let color = [0, 0, 0];
        
        if (r1 <= 1) {
            status = 'قابل قبول ✓';
            color = [0, 128, 0];
        } else if (r1 <= 1.6) {
            status = 'نیاز به بهبود ⚠';
            color = [255, 140, 0];
        } else {
            status = 'غیرقابل قبول ✗';
            color = [255, 0, 0];
        }
        
        doc.setTextColor(...color);
        doc.text(`ریسک افراد: ${status}`, rightX, y, { align: 'right' });
        y += 8;
    }
    
    if (calculationResults.R2) {
        const r2 = calculationResults.R2;
        let status = '';
        let color = [0, 0, 0];
        
        if (r2 <= 1) {
            status = 'قابل قبول ✓';
            color = [0, 128, 0];
        } else if (r2 <= 1.6) {
            status = 'نیاز به بهبود ⚠';
            color = [255, 140, 0];
        } else {
            status = 'غیرقابل قبول ✗';
            color = [255, 0, 0];
        }
        
        doc.setTextColor(...color);
        doc.text(`ریسک فعالیت: ${status}`, rightX, y, { align: 'right' });
        y += 8;
    }
    
    // توصیه‌ها (اگر وجود داشته باشد)
    const recommendations = document.getElementById('report-recommendations')?.innerText;
    if (recommendations && recommendations.trim()) {
        doc.addPage();
        y = 30;
        
        doc.setFontSize(16);
        doc.setTextColor(76, 132, 198);
        doc.text('توصیه‌های بهبود', rightX, y, { align: 'right' });
        y += 15;
        
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        
        // تقسیم متن طولانی به خطوط
        const lines = doc.splitTextToSize(recommendations, 170);
        lines.forEach(line => {
            if (y > 270) { // اگر به انتهای صفحه رسیدیم
                doc.addPage();
                y = 30;
            }
            doc.text(line, rightX, y, { align: 'right' });
            y += 7;
        });
    }
    
    // فوتر در همه صفحات
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(9);
        doc.setTextColor(128, 128, 128);
        doc.text(`صفحه ${i} از ${pageCount}`, 105, 285, { align: 'center' });
        doc.text('گزارش تولید شده توسط سامانه FRAME - شرکت ملی گاز ایران', 105, 290, { align: 'center' });
    }
    
    // ذخیره PDF
    const fileName = `FRAME_Report_${projectInfo.name.replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`;
    doc.save(fileName);
    
    showMessage('success', '✅ فایل PDF با موفقیت دانلود شد');
}

// تابع کمکی برای تبدیل عناصر HTML به PDF (روش جایگزین با html2canvas)
function exportPDFWithCanvas() {
    showMessage('info', 'در حال آماده‌سازی PDF... لطفاً صبر کنید');
    
    // ایجاد یک div موقت برای محتوای گزارش
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.backgroundColor = 'white';
    tempDiv.style.padding = '20px';
    tempDiv.style.width = '210mm'; // عرض A4
    tempDiv.style.fontFamily = 'Vazir, Arial, sans-serif';
    
    // کپی محتوای گزارش
    tempDiv.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #4C84C6;">گزارش ارزیابی ریسک حریق FRAME</h1>
            <p>شرکت ملی گاز ایران - مدیریت HSE و پدافند غیرعامل</p>
        </div>
        
        <div style="margin-bottom: 20px; padding: 15px; background: #f5f5f5; border-radius: 8px;">
            <h3>اطلاعات پروژه</h3>
            <p><strong>نام پروژه:</strong> ${document.getElementById('project-name').value || '-'}</p>
            <p><strong>آدرس:</strong> ${document.getElementById('project-address').value || '-'}</p>
            <p><strong>کارشناس:</strong> ${document.getElementById('expert-name').value || '-'}</p>
            <p><strong>طبقه/بخش:</strong> ${document.getElementById('floor-name').value || '-'}</p>
            <p><strong>تاریخ:</strong> ${new Date().toLocaleDateString('fa-IR')}</p>
        </div>
        
        ${document.getElementById('report-summary').innerHTML}
        ${document.getElementById('report-recommendations').innerHTML}
    `;
    
    document.body.appendChild(tempDiv);
    
    // تبدیل به canvas و سپس PDF
    html2canvas(tempDiv, {
        scale: 2,
        logging: false,
        useCORS: true
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');
        
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
        
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        
        doc.save(`FRAME_Report_${new Date().getTime()}.pdf`);
        document.body.removeChild(tempDiv);
        showMessage('success', '✅ فایل PDF با موفقیت دانلود شد');
    }).catch(error => {
        console.error('خطا در تولید PDF:', error);
        document.body.removeChild(tempDiv);
        showMessage('error', 'خطا در تولید PDF. لطفاً دوباره تلاش کنید');
    });
}


// =================== سیستم گزارش‌گیری Excel ===================

// آرایه برای ذخیره داده‌های طبقات مختلف
let floorsData = [];

// تابع تبدیل تاریخ میلادی به شمسی
function toPersianDate(date) {
    return new Intl.DateTimeFormat('fa-IR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

// تابع افزودن داده‌های طبقه فعلی به لیست مقایسه
function addToComparison() {
    // جمع‌آوری اطلاعات طبقه فعلی
    const floorData = {
        // اطلاعات پروژه
        projectName: document.getElementById('project-name').value || 'بدون نام',
        floorName: document.getElementById('floor-name').value || `طبقه ${Date.now()}`,
        date: new Date().toLocaleDateString('fa-IR'),
        time: new Date().toLocaleTimeString('fa-IR'),
        
        // نتایج محاسبات
        risks: {
            P: calculationResults.P,
            P1: calculationResults.P1,
            P2: calculationResults.P2,
            R: calculationResults.R,
            R1: calculationResults.R1,
            R2: calculationResults.R2
        },
        
        // جزئیات ضرایب
        factors: {
            q: calculationResults.q,
            i: calculationResults.i,
            g: calculationResults.g,
            e: calculationResults.e,
            v: calculationResults.v,
            z: calculationResults.z
        },
        
        // سطوح پذیرش و حفاظت
        levels: {
            A: calculationResults.A,
            A1: calculationResults.A1,
            A2: calculationResults.A2,
            D: calculationResults.D,
            D1: calculationResults.D1,
            D2: calculationResults.D2
        }
    };
    
    // بازیابی لیست طبقات ذخیره شده قبلی
    let comparisonList = JSON.parse(localStorage.getItem('frameFloorComparison') || '[]');
    
    // بررسی تکراری نبودن
    const exists = comparisonList.find(floor => 
        floor.projectName === floorData.projectName && 
        floor.floorName === floorData.floorName
    );
    
    if (exists) {
        if (confirm('اطلاعات این طبقه قبلاً ذخیره شده است. آیا می‌خواهید جایگزین شود؟')) {
            comparisonList = comparisonList.filter(floor => 
                !(floor.projectName === floorData.projectName && 
                  floor.floorName === floorData.floorName)
            );
        } else {
            return;
        }
    }
    
    // اضافه کردن به لیست
    comparisonList.push(floorData);
    
    // ذخیره در localStorage
    localStorage.setItem('frameFloorComparison', JSON.stringify(comparisonList));
    
    showMessage('success', `✅ طبقه "${floorData.floorName}" به لیست مقایسه اضافه شد`);
    
    // نمایش دکمه مشاهده مقایسه
    showComparisonButton();
}

function showComparisonButton() {
    // بررسی وجود دکمه
    let compareBtn = document.getElementById('view-comparison-btn');
    
    if (!compareBtn) {
        // ایجاد دکمه اگر وجود ندارد
        compareBtn = document.createElement('button');
        compareBtn.id = 'view-comparison-btn';
        compareBtn.className = 'btn btn-comparison';
        compareBtn.innerHTML = '📊 مشاهده مقایسه طبقات';
        compareBtn.onclick = showFloorComparison;
        
        // اضافه کردن به کنار دکمه‌های دیگر
        const btnGroup = document.querySelector('.project-info-section .btn-group') || 
                        document.querySelector('.project-info-section > div:last-child');
        if (btnGroup) {
            btnGroup.appendChild(compareBtn);
        }
    }
    
    // نمایش تعداد طبقات ذخیره شده
    const count = JSON.parse(localStorage.getItem('frameFloorComparison') || '[]').length;
    compareBtn.innerHTML = `📊 مشاهده مقایسه طبقات (${count})`;
}


function generateComparisonRows(comparisonList) {
    return comparisonList.map((floor, index) => {
        const r = floor.risks.R || 0;
        const r1 = floor.risks.R1 || 0;
        const r2 = floor.risks.R2 || 0;
        
        // تعیین وضعیت کلی
        const maxRisk = Math.max(r, r1, r2);
        let status, statusColor, statusIcon;
        
        if (maxRisk <= 1) {
            status = 'قابل قبول';
            statusColor = '#27ae60';
            statusIcon = '✅';
        } else if (maxRisk <= 1.6) {
            status = 'نیاز به بهبود';
            statusColor = '#f39c12';
            statusIcon = '⚠️';
        } else {
            status = 'بحرانی';
            statusColor = '#e74c3c';
            statusIcon = '❌';
        }
        
        return `
            <tr>
                <td>
                    <strong>${floor.floorName}</strong>
                    <br>
                    <small>${floor.projectName}</small>
                    <br>
                    <small style="color: #666;">${floor.date}</small>
                </td>
                <td class="${getRiskClass(r)}">
                    ${r.toFixed(2)}
                </td>
                <td class="${getRiskClass(r1)}">
                    ${r1.toFixed(2)}
                </td>
                <td class="${getRiskClass(r2)}">
                    ${r2.toFixed(2)}
                </td>
                <td style="color: ${statusColor}; font-weight: bold;">
                    ${statusIcon} ${status}
                </td>
                <td>
                    <button onclick="removeFromComparison(${index})" class="btn-small btn-danger">
                        حذف
                    </button>
                    <button onclick="loadFloorData(${index})" class="btn-small btn-info">
                        بارگذاری
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}
function drawComparisonChart(comparisonList) {
    // استفاده از Chart.js
    const ctx = document.getElementById('comparisonChart').getContext('2d');
    
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: comparisonList.map(f => f.floorName),
            datasets: [
                {
                    label: 'ریسک ساختمان (R)',
                    data: comparisonList.map(f => f.risks.R || 0),
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: 'ریسک افراد (R1)',
                    data: comparisonList.map(f => f.risks.R1 || 0),
                    backgroundColor: 'rgba(255, 206, 86, 0.5)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1
                },
                {
                    label: 'ریسک فعالیت (R2)',
                    data: comparisonList.map(f => f.risks.R2 || 0),
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'مقدار ریسک'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'مقایسه ریسک طبقات مختلف'
                },
                annotation: {
                    annotations: {
                        line1: {
                            type: 'line',
                            yMin: 1,
                            yMax: 1,
                            borderColor: 'green',
                            borderWidth: 2,
                            borderDash: [5, 5],
                            label: {
                                content: 'حد قابل قبول',
                                enabled: true
                            }
                        },
                        line2: {
                            type: 'line',
                            yMin: 1.6,
                            yMax: 1.6,
                            borderColor: 'red',
                            borderWidth: 2,
                            borderDash: [5, 5],
                            label: {
                                content: 'حد بحرانی',
                                enabled: true
                            }
                        }
                    }
                }
            }
        }
    });
}
function exportComparisonExcel() {
    const comparisonList = JSON.parse(localStorage.getItem('frameFloorComparison') || '[]');
    
    if (comparisonList.length === 0) {
        showMessage('error', 'داده‌ای برای خروجی وجود ندارد');
        return;
    }
    
    // آماده‌سازی داده‌ها برای Excel
    const excelData = comparisonList.map(floor => ({
        'نام پروژه': floor.projectName,
        'طبقه/بخش': floor.floorName,
        'تاریخ ارزیابی': floor.date,
        'ریسک ساختمان (R)': floor.risks.R?.toFixed(2) || '-',
        'ریسک افراد (R1)': floor.risks.R1?.toFixed(2) || '-',
        'ریسک فعالیت (R2)': floor.risks.R2?.toFixed(2) || '-',
        'بار آتش (q)': floor.factors.q?.toFixed(2) || '-',
        'گسترش (i)': floor.factors.i?.toFixed(2) || '-',
        'سطح (g)': floor.factors.g?.toFixed(2) || '-',
        'وضعیت': getOverallStatus(floor.risks)
    }));
    
    // ایجاد worksheet
    const ws = XLSX.utils.json_to_sheet(excelData);
    
    // تنظیم عرض ستون‌ها
    ws['!cols'] = [
        {wch: 20}, {wch: 15}, {wch: 12}, 
        {wch: 12}, {wch: 12}, {wch: 12},
        {wch: 10}, {wch: 10}, {wch: 10}, {wch: 15}
    ];
    
    // ایجاد workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "مقایسه طبقات");
    
    // دانلود
    XLSX.writeFile(wb, `FRAME_Comparison_${Date.now()}.xlsx`);
    
    showMessage('success', '✅ فایل Excel مقایسه‌ای دانلود شد');
}

// تابع تعیین وضعیت ریسک
function getRiskStatus(risk) {
    if (!risk) return 'محاسبه نشده';
    if (risk <= 1) return 'قابل قبول';
    if (risk <= 1.6) return 'نیاز به بهبود';
    return 'غیرقابل قبول';
}

// تابع اصلی تولید گزارش Excel
function exportToExcel() {
    // بررسی وجود داده
    if (!calculationResults.P && floorsData.length === 0) {
        showMessage('error', 'ابتدا محاسبات را انجام دهید');
        return;
    }

    // ایجاد Workbook جدید
    const wb = XLSX.utils.book_new();
    
    // 1. شیت اطلاعات کلی پروژه
    const projectInfo = [
        ['گزارش ارزیابی ریسک حریق - روش FRAME'],
        [''],
        ['نام پروژه:', document.getElementById('project-name')?.value || 'بدون نام'],
        ['آدرس:', document.getElementById('project-address')?.value || 'وارد نشده'],
        ['تاریخ گزارش:', toPersianDate(new Date())],
        ['کارشناس:', document.getElementById('expert-name')?.value || 'وارد نشده'],
        [''],
        ['شرکت ملی گاز ایران - مدیریت HSE و پدافند غیرعامل']
    ];
    
    const wsInfo = XLSX.utils.aoa_to_sheet(projectInfo);
    XLSX.utils.book_append_sheet(wb, wsInfo, 'اطلاعات پروژه');
    
    // 2. شیت داده‌های طبقه فعلی
    if (calculationResults.P) {
        const currentFloorData = createFloorDataSheet();
        const wsCurrentFloor = XLSX.utils.aoa_to_sheet(currentFloorData);
        XLSX.utils.book_append_sheet(wb, wsCurrentFloor, 'طبقه فعلی');
    }
    
    // 3. شیت مقایسه طبقات (اگر داده‌ای وجود دارد)
    if (floorsData.length > 0) {
        const wsComparison = XLSX.utils.json_to_sheet(floorsData);
        XLSX.utils.book_append_sheet(wb, wsComparison, 'مقایسه طبقات');
        
        // 4. شیت نمودارهای مقایسه
        const chartData = createComparisonChartData();
        const wsCharts = XLSX.utils.aoa_to_sheet(chartData);
        XLSX.utils.book_append_sheet(wb, wsCharts, 'داده نمودارها');
    }
    
    // 5. شیت توصیه‌ها و اقدامات اصلاحی
    const recommendations = createRecommendationsSheet();
    const wsRecommendations = XLSX.utils.aoa_to_sheet(recommendations);
    XLSX.utils.book_append_sheet(wb, wsRecommendations, 'توصیه‌ها');
    
    // تنظیمات ستون‌ها
    setColumnWidths(wb);
    
    // ذخیره فایل
    const fileName = `FRAME_Risk_Assessment_${new Date().toLocaleDateString('fa-IR').replace(/\//g, '-')}.xlsx`;
    XLSX.writeFile(wb, fileName);
    
    showMessage('success', 'گزارش Excel با موفقیت تولید شد');
}

// تابع ایجاد داده‌های طبقه فعلی
function createFloorDataSheet() {
    const data = [
        ['گزارش تفصیلی ارزیابی ریسک - طبقه فعلی'],
        [''],
        ['بخش', 'پارامتر', 'مقدار', 'توضیحات'],
        [''],
        ['ضرایب ریسک بالقوه', '', '', ''],
        ['', 'q (بار آتش)', calculationResults.q?.toFixed(3) || '-', 'شدت بار حریق'],
        ['', 'i (گسترش)', calculationResults.i?.toFixed(3) || '-', 'سرعت گسترش آتش'],
        ['', 'g (سطح)', calculationResults.g?.toFixed(3) || '-', 'گسترش افقی'],
        ['', 'e (طبقه)', calculationResults.e?.toFixed(3) || '-', 'اثر ارتفاع'],
        ['', 'v (تهویه)', calculationResults.v?.toFixed(3) || '-', 'تأثیر دود و حرارت'],
        ['', 'z (دسترسی)', calculationResults.z?.toFixed(3) || '-', 'سهولت دسترسی امداد'],
        [''],
        ['ریسک‌های بالقوه', '', '', ''],
        ['', 'P (ساختمان)', calculationResults.P?.toFixed(3) || '-', getRiskColor(calculationResults.P)],
        ['', 'P₁ (افراد)', calculationResults.P1?.toFixed(3) || '-', getRiskColor(calculationResults.P1)],
        ['', 'P₂ (فعالیت)', calculationResults.P2?.toFixed(3) || '-', getRiskColor(calculationResults.P2)],
        [''],
        ['سطوح پذیرش', '', '', ''],
        ['', 'A (ساختمان)', calculationResults.A?.toFixed(3) || '-', ''],
        ['', 'A₁ (افراد)', calculationResults.A1?.toFixed(3) || '-', ''],
        ['', 'A₂ (فعالیت)', calculationResults.A2?.toFixed(3) || '-', ''],
        [''],
        ['سطوح حفاظت', '', '', ''],
        ['', 'D (ساختمان)', calculationResults.D?.toFixed(3) || '-', ''],
        ['', 'D₁ (افراد)', calculationResults.D1?.toFixed(3) || '-', ''],
        ['', 'D₂ (فعالیت)', calculationResults.D2?.toFixed(3) || '-', ''],
        [''],
        ['ریسک‌های نهایی', '', '', ''],
        ['', 'R (ساختمان)', calculationResults.R?.toFixed(3) || '-', getRiskStatus(calculationResults.R)],
        ['', 'R₁ (افراد)', calculationResults.R1?.toFixed(3) || '-', getRiskStatus(calculationResults.R1)],
        ['', 'R₂ (فعالیت)', calculationResults.R2?.toFixed(3) || '-', getRiskStatus(calculationResults.R2)]
    ];
    
    return data;
}

// تابع ایجاد داده‌های نمودار مقایسه
function createComparisonChartData() {
    const headers = ['طبقه', 'R_ساختمان', 'R_افراد', 'R_فعالیت', 'P_کل', 'A_کل', 'D_کل'];
    const data = [headers];
    
    floorsData.forEach(floor => {
        data.push([
            floor.نام_طبقه,
            floor.R_ساختمان,
            floor.R1_افراد,
            floor.R2_فعالیت,
            floor.P_ساختمان,
            floor.A_ساختمان,
            floor.D_ساختمان
        ]);
    });
    
    return data;
}

// تابع ایجاد شیت توصیه‌ها
function createRecommendationsSheet() {
    const recommendations = [
        ['توصیه‌های بهبود ایمنی'],
        [''],
        ['اولویت', 'بخش', 'توصیه', 'اثربخشی'],
        ['']
    ];
    
    // تحلیل و ارائه توصیه‌ها بر اساس نتایج
    if (calculationResults.R > 1.6) {
        recommendations.push(['بحرانی', 'کلی', 'نصب سیستم اسپرینکلر کامل', 'بسیار بالا']);
    }
    if (calculationResults.q > 1.5) {
        recommendations.push(['بالا', 'بار آتش', 'کاهش مواد قابل احتراق', 'بالا']);
    }
    if (calculationResults.v > 1.5) {
        recommendations.push(['متوسط', 'تهویه', 'بهبود سیستم تخلیه دود', 'متوسط']);
    }
    if (calculationResults.z > 1.5) {
        recommendations.push(['بالا', 'دسترسی', 'بهبود راه‌های دسترسی آتش‌نشانی', 'بالا']);
    }
    
    return recommendations;
}

// تابع تنظیم عرض ستون‌ها
function setColumnWidths(workbook) {
    const widths = {
        'اطلاعات پروژه': [{wch: 20}, {wch: 40}],
        'طبقه فعلی': [{wch: 20}, {wch: 20}, {wch: 15}, {wch: 30}],
        'مقایسه طبقات': [{wch: 15}, {wch: 20}, {wch: 12}, {wch: 12}],
        'توصیه‌ها': [{wch: 10}, {wch: 15}, {wch: 40}, {wch: 15}]
    };
    
    Object.keys(widths).forEach(sheetName => {
        if (workbook.Sheets[sheetName]) {
            workbook.Sheets[sheetName]['!cols'] = widths[sheetName];
        }
    });
}

// تابع تعیین رنگ بر اساس سطح ریسک
function getRiskColor(risk) {
    if (!risk) return '';
    if (risk <= 1) return 'سبز - ایمن';
    if (risk <= 1.6) return 'زرد - احتیاط';
    return 'قرمز - خطر';
}

// =================== ایجاد نمودار در صفحه ===================

function showComparisonChart() {
    if (floorsData.length === 0) {
        showMessage('error', 'هیچ داده‌ای برای مقایسه وجود ندارد');
        return;
    }
    
    // ایجاد modal برای نمایش نمودار
    const modal = document.createElement('div');
    modal.className = 'chart-modal';
    modal.innerHTML = `
        <div class="chart-container">
            <h3>مقایسه ریسک طبقات</h3>
            <canvas id="comparisonChart"></canvas>
            <button onclick="this.parentElement.parentElement.remove()" class="btn btn-close">بستن</button>
        </div>
    `;
    document.body.appendChild(modal);
    
    // ایجاد نمودار
    const ctx = document.getElementById('comparisonChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: floorsData.map(f => f.نام_طبقه),
            datasets: [
                {
                    label: 'ریسک ساختمان',
                    data: floorsData.map(f => f.R_ساختمان),
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 1
                },
                {
                    label: 'ریسک افراد',
                    data: floorsData.map(f => f.R1_افراد),
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth: 1
                },
                {
                    label: 'ریسک فعالیت',
                    data: floorsData.map(f => f.R2_فعالیت),
                    backgroundColor: 'rgba(255, 206, 86, 0.5)',
                    borderColor: 'rgb(255, 206, 86)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'مقایسه سطوح ریسک در طبقات مختلف'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'سطح ریسک'
                    }
                }
            }
        }
    });
}

// تابع ذخیره اطلاعات پروژه
function saveProjectData() {
    const projectData = {
        projectName: document.getElementById('project-name').value,
        projectAddress: document.getElementById('project-address').value,
        expertName: document.getElementById('expert-name').value,
        floorName: document.getElementById('floor-name').value,
        date: new Date().toLocaleDateString('fa-IR'),
        calculationResults: calculationResults
    };
    
    // بررسی فیلد اجباری
    if (!projectData.projectName) {
        showMessage('error', 'لطفاً نام پروژه را وارد کنید');
        return;
    }
    
    // ذخیره در localStorage
    localStorage.setItem('frameProjectData', JSON.stringify(projectData));
    
    // ذخیره برای مقایسه طبقات
    let allProjects = JSON.parse(localStorage.getItem('allFrameProjects') || '[]');
    allProjects.push(projectData);
    localStorage.setItem('allFrameProjects', JSON.stringify(allProjects));
    
    showMessage('success', '✅ اطلاعات پروژه با موفقیت ذخیره شد');
}

// تابع دانلود Excel
function exportToExcel() {
    // ابتدا بررسی می‌کنیم که SheetJS لود شده باشد
    if (typeof XLSX === 'undefined') {
        showMessage('error', 'کتابخانه Excel لود نشده است');
        return;
    }
    
    // جمع‌آوری داده‌ها
    const projectData = {
          // ===== اطلاعات کلی پروژه =====
    'نام پروژه': document.getElementById('project-name')?.value || '-',
    'آدرس': document.getElementById('project-address')?.value || '-',
    'کارشناس': document.getElementById('expert-name')?.value || '-',
    'نام طبقه': document.getElementById('floor-name')?.value || '-',
    'شماره طبقه': document.getElementById('floor-number')?.value || '-',
    'تاریخ ارزیابی': new Date().toLocaleDateString('fa-IR'),
    'ساعت ارزیابی': new Date().toLocaleTimeString('fa-IR'),
    
    // ===== ضرایب ریسک بالقوه (P) =====
    'بار آتش ساختمان (Qi)': document.getElementById('qi')?.value || '-',
    'بار آتش محتویات (Qm)': document.getElementById('qm')?.value || '-',
    'ضریب بار آتش (q)': calculationResults.q?.toFixed(3) || '-',
    
    'دمای تخریب (T)': document.getElementById('temp-destruction')?.value || '-',
    'ابعاد متوسط (m)': document.getElementById('avg-dimension')?.value || '-',
    'کلاس واکنش به آتش (M)': document.getElementById('fire-class')?.value || '-',
    'ضریب گسترش (i)': calculationResults.i?.toFixed(3) || '-',
    
    'طول بخش (l)': document.getElementById('section-length')?.value || '-',
    'عرض بخش (b)': document.getElementById('section-width')?.value || '-',
    'مساحت بخش': document.getElementById('section-area')?.value || '-',
    'نوع دسترسی': document.getElementById('access-type')?.value === 'narrow' ? 'ضلع باریک' : 'ضلع عریض',
    'ضریب سطح (g)': calculationResults.g?.toFixed(3) || '-',
    
    'ارتفاع سقف (h)': document.getElementById('ceiling-height')?.value || '-',
    'تعداد طبقات (E)': document.getElementById('floors-count')?.value || '-',
    'ضریب طبقه (e)': calculationResults.e?.toFixed(3) || '-',
    
    'وضعیت بازشوها': document.getElementById('opening-status')?.value || '-',
    'وضعیت دود': document.getElementById('smoke-status')?.value || '-',
    'ضریب تهویه (v)': calculationResults.v?.toFixed(3) || '-',
    
    'فاصله آتش‌نشانی': document.getElementById('fire-distance')?.value || '-',
    'پهنای مسیر دسترسی': document.getElementById('access-width')?.value || '-',
    'ضریب دسترسی (z)': calculationResults.z?.toFixed(3) || '-',
    
    'ریسک بالقوه ساختمان (P)': calculationResults.P?.toFixed(3) || '-',
    'ریسک بالقوه افراد (P1)': calculationResults.P1?.toFixed(3) || '-',
    'ریسک بالقوه فعالیت (P2)': calculationResults.P2?.toFixed(3) || '-',
    
    // ===== ضرایب سطح پذیرش (A) =====
    'ضریب فعالیت‌ها (a)': calculationResults.a?.toFixed(3) || '-',
    
    'تعداد افراد': document.getElementById('people-count')?.value || '-',
    'درصد متحرک': document.getElementById('mobile-percent')?.value || '-',
    'طول خروج': document.getElementById('exit-length')?.value || '-',
    'عرض خروج': document.getElementById('exit-width')?.value || '-',
    'زمان تخلیه (t)': calculationResults.t?.toFixed(3) || '-',
    
    'ارزش محتویات': document.getElementById('contents-value')?.value || '-',
    'تمرکز ارزش': document.getElementById('value-concentration')?.value || '-',
    'ضریب محتویات (c)': calculationResults.c?.toFixed(3) || '-',
    
    'ضرایب محیطی': document.getElementById('environmental-factors')?.value || '-',
    'ضریب محیط (r)': calculationResults.r?.toFixed(3) || '-',
    
    'روزهای توقف': document.getElementById('stop-days')?.value || '-',
    'ضریب وابستگی (d)': calculationResults.d?.toFixed(3) || '-',
    
    'سطح پذیرش ساختمان (A)': calculationResults.A?.toFixed(3) || '-',
    'سطح پذیرش افراد (A1)': calculationResults.A1?.toFixed(3) || '-',
    'سطح پذیرش فعالیت (A2)': calculationResults.A2?.toFixed(3) || '-',
    
    // ===== ضرایب سطح حفاظت (D) =====
    'منابع آب': document.getElementById('water-source')?.value || '-',
    'ذخیره آب': document.getElementById('water-storage')?.value || '-',
    'فشار آب': document.getElementById('water-pressure')?.value || '-',
    'ضریب منابع آب (W)': calculationResults.W?.toFixed(3) || '-',
    
    'تعداد آتش‌نشان': document.getElementById('firefighters-count')?.value || '-',
    'سطح آموزش': document.getElementById('training-level')?.value || '-',
    'ضریب آتش‌نشانی (N)': calculationResults.N?.toFixed(3) || '-',
    
    'مقاومت سازه (دقیقه)': document.getElementById('structure-resistance')?.value || '-',
    'ضریب حفاظت سازه (S)': calculationResults.S?.toFixed(3) || '-',
    
    'تقسیمات فضا': document.getElementById('space-division')?.value || '-',
    'تخلیه دود': document.getElementById('smoke-exhaust')?.value || '-',
    'ضریب تقسیم‌بندی (F)': calculationResults.F?.toFixed(3) || '-',
    
    'امتیاز U': calculationResults.u_score || '-',
    'ضریب U': calculationResults.U?.toFixed(3) || '-',
    
    'امتیاز Y': calculationResults.y_score || '-',
    'ضریب Y': calculationResults.Y?.toFixed(3) || '-',
    
    'سطح حفاظت ساختمان (D)': calculationResults.D?.toFixed(3) || '-',
    'سطح حفاظت افراد (D1)': calculationResults.D1?.toFixed(3) || '-',
    'سطح حفاظت فعالیت (D2)': calculationResults.D2?.toFixed(3) || '-',
    
    // ===== ریسک‌های نهایی =====
    'ریسک نهایی ساختمان (R)': calculationResults.R?.toFixed(3) || '-',
    'وضعیت R': getRiskStatus(calculationResults.R),
    
    'ریسک نهایی افراد (R1)': calculationResults.R1?.toFixed(3) || '-',
    'وضعیت R1': getRiskStatus(calculationResults.R1),
    
    'ریسک نهایی فعالیت (R2)': calculationResults.R2?.toFixed(3) || '-',
    'وضعیت R2': getRiskStatus(calculationResults.R2),
    
    // ===== اطلاعات تکمیلی =====
    'نوع کاربری': document.getElementById('building-usage')?.value || '-',
    'سال ساخت': document.getElementById('construction-year')?.value || '-',
    'آخرین بازرسی': document.getElementById('last-inspection')?.value || '-',
    'توضیحات': document.getElementById('additional-notes')?.value || '-'
    };
    
    // ایجاد workbook
    const ws = XLSX.utils.json_to_sheet([projectData]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "گزارش FRAME");
    
    // دانلود فایل
    XLSX.writeFile(wb, `FRAME_Report_${new Date().getTime()}.xlsx`);
    
    showMessage('success', '✅ فایل Excel با موفقیت دانلود شد');
}


// =================== Event Listeners ===================

document.addEventListener('DOMContentLoaded', function() {
    // تنظیم event listener برای لینک‌های منو
    document.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const sectionId = href.substring(1);
                showSection(sectionId);
            }
        });
    });
    
    // نمایش اولین بخش
    showSection('potential-risk');
    
    // اضافه کردن tooltips
    initializeTooltips();
});

// تنظیم tooltips
function initializeTooltips() {
    document.querySelectorAll('.input-hint').forEach(hint => {
        const input = hint.previousElementSibling?.querySelector('input, select');
        if (input) {
            input.addEventListener('focus', () => {
                hint.style.display = 'block';
            });
            
            input.addEventListener('blur', () => {
                setTimeout(() => {
                    hint.style.display = 'none';
                }, 200);
            });
        }
    });
}

// =================== سیستم ذخیره‌سازی تجمیعی Excel ===================

// ذخیره نتایج در localStorage به صورت تجمیعی
function saveToAccumulativeExcel() {
    // دریافت اطلاعات پروژه
    const projectName = document.getElementById('project-name')?.value || 
                       prompt('نام پروژه را وارد کنید:') || 'پروژه بدون نام';
    
    const floorName = document.getElementById('floor-name')?.value || 
                     prompt('نام/شماره طبقه را وارد کنید:') || 'طبقه نامشخص';
    
    const projectAddress = document.getElementById('project-address')?.value || 'آدرس وارد نشده';

    // ایجاد رکورد جدید با تمام داده‌ها
    const newRecord = {
        // اطلاعات پایه
        projectName: projectName,
        projectAddress: projectAddress,
        floorName: floorName,
        date: new Date().toISOString(),
        time: new Date().toLocaleTimeString('fa-IR'),
        
        // ضرایب ریسک بالقوه
        q: calculationResults.q || 0,
        i: calculationResults.i || 0,
        g: calculationResults.g || 0,
        e: calculationResults.e || 0,
        v: calculationResults.v || 0,
        z: calculationResults.z || 0,
        
        // ضرایب سطح پذیرش
        a: calculationResults.a || 0,
        t: calculationResults.t || 0,
        c: calculationResults.c || 0,
        r: calculationResults.r || 0,
        d: calculationResults.d || 0,
        
        // ضرایب سطح حفاظت
        W: calculationResults.W || 0,
        N: calculationResults.N || 0,
        S: calculationResults.S || 0,
        F: calculationResults.F || 0,
        U: calculationResults.U || 0,
        Y: calculationResults.Y || 0,
        
        // نتایج محاسبات
        P: calculationResults.P || 0,
        P1: calculationResults.P1 || 0,
        P2: calculationResults.P2 || 0,
        A: calculationResults.A || 0,
        A1: calculationResults.A1 || 0,
        A2: calculationResults.A2 || 0,
        D: calculationResults.D || 0,
        D1: calculationResults.D1 || 0,
        D2: calculationResults.D2 || 0,
        R: calculationResults.R || 0,
        R1: calculationResults.R1 || 0,
        R2: calculationResults.R2 || 0,
        
        // وضعیت ریسک
        riskStatus: calculationResults.R <= 1 ? 'قابل قبول' : 
                   calculationResults.R <= 1.6 ? 'متوسط' : 'غیرقابل قبول',
        riskStatusPeople: calculationResults.R1 <= 1 ? 'قابل قبول' : 
                         calculationResults.R1 <= 1.6 ? 'متوسط' : 'غیرقابل قبول',
        riskStatusActivity: calculationResults.R2 <= 1 ? 'قابل قبول' : 
                           calculationResults.R2 <= 1.6 ? 'متوسط' : 'غیرقابل قبول'
    };

    // دریافت رکوردهای قبلی
    let allRecords = JSON.parse(localStorage.getItem('allFireRiskRecords') || '[]');
    
    // اضافه کردن رکورد جدید
    allRecords.push(newRecord);
    
    // ذخیره در localStorage
    localStorage.setItem('allFireRiskRecords', JSON.stringify(allRecords));
    
    // نمایش پیام موفقیت
    showMessage('success', `رکورد شماره ${allRecords.length} به فایل Excel تجمیعی اضافه شد`);
    
    // به‌روزرسانی شمارنده
    updateRecordCount();
}

// به‌روزرسانی شمارنده رکوردها
function updateRecordCount() {
    const allRecords = JSON.parse(localStorage.getItem('allFireRiskRecords') || '[]');
    const countElement = document.getElementById('record-count');
    if (countElement) {
        countElement.textContent = allRecords.length;
    }
}

// دانلود فایل Excel تجمیعی با فرمت واقعی Excel
function downloadAccumulativeExcel() {
    const allRecords = JSON.parse(localStorage.getItem('allFireRiskRecords') || '[]');
    
    if (allRecords.length === 0) {
        showMessage('warning', 'هیچ رکوردی برای دانلود وجود ندارد');
        return;
    }

    // آماده‌سازی داده‌ها برای Excel
    const excelData = [];
    
    // سطر عنوان
    excelData.push([
        'ردیف',
        'پروژه', 
        'طبقه',
        'تاریخ',
        'R',
        'R1', 
        'R2',
        'وضعیت',
        'عملیات'
    ]);

    // اضافه کردن داده‌ها
    allRecords.forEach((record, index) => {
        excelData.push([
            index + 1,
            record.projectName,
            record.floorName,
            new Date(record.date).toLocaleDateString('fa-IR'),
            parseFloat(record.R).toFixed(2),
            parseFloat(record.R1).toFixed(2),
            parseFloat(record.R2).toFixed(2),
            record.riskStatus,
            record.R <= 1 ? 'قابل قبول' : record.R <= 1.6 ? 'احتیاط' : 'حذف'
        ]);
    });

    // ایجاد Workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(excelData);

    // تنظیم عرض ستون‌ها
    const colWidths = [
        { wch: 8 },   // ردیف
        { wch: 20 },  // پروژه
        { wch: 15 },  // طبقه
        { wch: 15 },  // تاریخ
        { wch: 10 },  // R
        { wch: 10 },  // R1
        { wch: 10 },  // R2
        { wch: 15 },  // وضعیت
        { wch: 12 }   // عملیات
    ];
    ws['!cols'] = colWidths;

    // استایل برای سلول‌ها (اختیاری - نیاز به کتابخانه xlsx-style دارد)
    // می‌توانید رنگ‌بندی مشروط برای R, R1, R2 اضافه کنید

    // اضافه کردن worksheet به workbook
    XLSX.utils.book_append_sheet(wb, ws, `رکوردهای ذخیره شده (${allRecords.length} مورد)`);

    // صفحه دوم: جزئیات کامل
    const detailData = [];
    
    // عناوین جزئیات
    detailData.push([
        'ردیف', 'پروژه', 'آدرس', 'طبقه', 'تاریخ', 'ساعت',
        'q', 'i', 'g', 'e', 'v', 'z',
        'a', 't', 'c', 'r', 'd',
        'W', 'N', 'S', 'F', 'U', 'Y',
        'P', 'P1', 'P2', 'A', 'A1', 'A2', 'D', 'D1', 'D2',
        'R', 'R1', 'R2',
        'وضعیت ساختمان', 'وضعیت افراد', 'وضعیت فعالیت'
    ]);

    // داده‌های جزئیات
    allRecords.forEach((record, index) => {
        detailData.push([
            index + 1,
            record.projectName,
            record.projectAddress,
            record.floorName,
            new Date(record.date).toLocaleDateString('fa-IR'),
            record.time,
            // ضرایب
            parseFloat(record.q).toFixed(2),
            parseFloat(record.i).toFixed(2),
            parseFloat(record.g).toFixed(2),
            parseFloat(record.e).toFixed(2),
            parseFloat(record.v).toFixed(2),
            parseFloat(record.z).toFixed(2),
            parseFloat(record.a).toFixed(2),
            parseFloat(record.t).toFixed(2),
            parseFloat(record.c).toFixed(2),
            parseFloat(record.r).toFixed(2),
            parseFloat(record.d).toFixed(2),
            parseFloat(record.W).toFixed(2),
            parseFloat(record.N).toFixed(2),
            parseFloat(record.S).toFixed(2),
            parseFloat(record.F).toFixed(2),
            parseFloat(record.U).toFixed(2),
            parseFloat(record.Y).toFixed(2),
            // محاسبات
            parseFloat(record.P).toFixed(2),
            parseFloat(record.P1).toFixed(2),
            parseFloat(record.P2).toFixed(2),
            parseFloat(record.A).toFixed(2),
            parseFloat(record.A1).toFixed(2),
            parseFloat(record.A2).toFixed(2),
            parseFloat(record.D).toFixed(2),
            parseFloat(record.D1).toFixed(2),
            parseFloat(record.D2).toFixed(2),
            parseFloat(record.R).toFixed(2),
            parseFloat(record.R1).toFixed(2),
            parseFloat(record.R2).toFixed(2),
            // وضعیت
            record.riskStatus,
            record.riskStatusPeople,
            record.riskStatusActivity
        ]);
    });

    const ws2 = XLSX.utils.aoa_to_sheet(detailData);
    XLSX.utils.book_append_sheet(wb, ws2, 'جزئیات کامل');

    // دانلود فایل
    const fileName = `گزارش_تجمیعی_ارزیابی_ریسک_${new Date().toLocaleDateString('fa-IR').replace(/\//g, '-')}.xlsx`;
    XLSX.writeFile(wb, fileName);
    
    showMessage('success', `✅ فایل Excel با ${allRecords.length} رکورد دانلود شد`);
}


// مشاهده رکوردهای ذخیره شده با استایل بهتر
function viewAllRecords() {
    const allRecords = JSON.parse(localStorage.getItem('allFireRiskRecords') || '[]');
    
    if (allRecords.length === 0) {
        showMessage('info', 'هیچ رکوردی ذخیره نشده است');
        return;
    }

    // ایجاد Modal برای نمایش
    const modalHtml = `
        <div id="records-modal" class="modal-bg" style="display: flex;">
            <div class="modal-guide" style="max-width: 95%; max-height: 90%;">
                <h2>📊 رکوردهای ذخیره شده (${allRecords.length} مورد)</h2>
                <div style="overflow: auto; max-height: 60vh;">
                    <style>
                        .excel-table {
                            width: 100%;
                            border-collapse: collapse;
                            font-family: Tahoma, Arial;
                            font-size: 14px;
                            background: white;
                            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                        }
                        .excel-table th {
                            background-color: #f0f0f0;
                            color: #333;
                            font-weight: bold;
                            padding: 12px 8px;
                            text-align: center;
                            border: 1px solid #ddd;
                            position: sticky;
                            top: 0;
                            z-index: 10;
                        }
                        .excel-table td {
                            padding: 8px;
                            text-align: center;
                            border: 1px solid #ddd;
                        }
                        .excel-table tr:nth-child(even) {
                            background-color: #f9f9f9;
                        }
                        .excel-table tr:hover {
                            background-color: #f5f5f5;
                        }
                        .status-good { color: #4CAF50; font-weight: bold; }
                        .status-warning { color: #FF9800; font-weight: bold; }
                        .status-danger { color: #f44336; font-weight: bold; }
                        .btn-delete {
                            background: #f44336;
                            color: white;
                            border: none;
                            padding: 4px 12px;
                            border-radius: 4px;
                            cursor: pointer;
                            font-size: 12px;
                        }
                        .btn-delete:hover {
                            background: #d32f2f;
                        }
                    </style>
                    <table class="excel-table">
                        <thead>
                            <tr>
                                <th>ردیف</th>
                                <th>پروژه</th>
                                <th>طبقه</th>
                                <th>تاریخ</th>
                                <th>R</th>
                                <th>R1</th>
                                <th>R2</th>
                                <th>وضعیت</th>
                                <th>عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${allRecords.map((record, index) => {
                                const rClass = record.R <= 1 ? 'status-good' : record.R <= 1.6 ? 'status-warning' : 'status-danger';
                                const r1Class = record.R1 <= 1 ? 'status-good' : record.R1 <= 1.6 ? 'status-warning' : 'status-danger';
                                const r2Class = record.R2 <= 1 ? 'status-good' : record.R2 <= 1.6 ? 'status-warning' : 'status-danger';
                                
                                return `
                                <tr>
                                    <td>${index + 1}</td>
                                    <td>${record.projectName}</td>
                                    <td>${record.floorName}</td>
                                    <td>${new Date(record.date).toLocaleDateString('fa-IR')}</td>
                                    <td class="${rClass}">${parseFloat(record.R).toFixed(2)}</td>
                                    <td class="${r1Class}">${parseFloat(record.R1).toFixed(2)}</td>
                                    <td class="${r2Class}">${parseFloat(record.R2).toFixed(2)}</td>
                                    <td>${record.riskStatus}</td>
                                    <td>
                                        <button onclick="deleteRecord(${index})" class="btn-delete">حذف</button>
                                    </td>
                                </tr>
                            `}).join('')}
                        </tbody>
                    </table>
                </div>
                <div style="margin-top: 20px; text-align: center;">
                    <button onclick="downloadAccumulativeExcel()" class="btn btn-success" style="margin: 0 5px;">
                        📊 دانلود Excel کامل
                    </button>
                    <button onclick="clearAllRecords()" class="btn btn-danger" style="margin: 0 5px;">
                        🗑️ حذف همه رکوردها
                    </button>
                    <button onclick="document.getElementById('records-modal').remove()" class="btn btn-primary" style="margin: 0 5px;">
                        بستن
                    </button>
                </div>
            </div>
        </div>
    `;

    // حذف modal قبلی
    const existingModal = document.getElementById('records-modal');
    if (existingModal) existingModal.remove();

    // اضافه کردن modal جدید
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}


// حذف یک رکورد
function deleteRecord(index) {
    if (confirm('آیا از حذف این رکورد اطمینان دارید؟')) {
        let allRecords = JSON.parse(localStorage.getItem('allFireRiskRecords') || '[]');
        allRecords.splice(index, 1);
        localStorage.setItem('allFireRiskRecords', JSON.stringify(allRecords));
        updateRecordCount();
        viewAllRecords(); // بازسازی جدول
        showMessage('success', 'رکورد حذف شد');
    }
}

// حذف همه رکوردها
function clearAllRecords() {
    if (confirm('آیا از حذف همه رکوردها اطمینان دارید؟')) {
        localStorage.removeItem('allFireRiskRecords');
        updateRecordCount();
        document.getElementById('records-modal')?.remove();
        showMessage('success', 'همه رکوردها حذف شدند');
    }
}

// اضافه کردن به window
window.saveToAccumulativeExcel = saveToAccumulativeExcel;
window.downloadAccumulativeExcel = downloadAccumulativeExcel;
window.viewAllRecords = viewAllRecords;
window.deleteRecord = deleteRecord;
window.clearAllRecords = clearAllRecords;
window.updateRecordCount = updateRecordCount;

// بارگذاری اولیه
document.addEventListener('DOMContentLoaded', function() {
    updateRecordCount();
});



function toggleHelpContent(element) {
    const content = element.nextElementSibling; // <div> بعد از h2
    if (content && content.classList.contains('g-help-content')) {
        content.classList.toggle('active');
    }
}
function toggleVentMode() {
    const mode = document.querySelector('input[name="ventMode"]:checked').value;
    document.getElementById('manual-vent').style.display = (mode === 'manual') ? 'block' : 'none';
    document.getElementById('advanced-vent').style.display = (mode === 'advanced') ? 'block' : 'none';
}

function toggleZHelp() {
    const helpBox = document.getElementById('z-help');
    helpBox.style.display = (helpBox.style.display === 'none' || helpBox.style.display === '')
        ? 'block'
        : 'none';
}




let activeHint = null;
let activeTimeout = null;

function showTHelpInline(fieldId, triggerElement) {
    const text = tHelpTexts[fieldId] || "توضیحی موجود نیست.";

    // حذف قبلی اگر باز است
    if (activeHint) {
        activeHint.remove();
        if (activeTimeout) clearTimeout(activeTimeout);
        activeHint = null;
    }

    // پیدا کردن باکس والد (input-group)
    const inputGroup = triggerElement.closest(".input-group");
    if (!inputGroup) return;

    // ساخت hint
    const hintBox = document.createElement("div");
    hintBox.className = "inline-hint";
    hintBox.textContent = text;

    inputGroup.appendChild(hintBox);
    activeHint = hintBox;

    // حذف بعد از 5 ثانیه
    activeTimeout = setTimeout(() => {
        if (activeHint === hintBox) {
            hintBox.remove();
            activeHint = null;
        }
    }, 5000);
}

// دسترسی سراسری
window.showTHelpInline = showTHelpInline;


// =================== Export Functions ===================
// اطمینان از دسترسی global به توابع
window.calculateQ = calculateQ;
window.calculateI = calculateI;
window.calculateG = calculateG;
window.toggleHelpContent = toggleHelpContent;
window.calculateE = calculateE;
window.calculateV = calculateV;
window.toggleVentMode = toggleVentMode;
window.calculateZ = calculateZ;
window.calculateTotalP = calculateTotalP;

window.calculateA = calculateA;
window.calculateT = calculateT;
window.calculateC = calculateC;
window.calculateR = calculateR;
window.calculateD = calculateD;

window.calculateW = calculateW2015;
window.calculateN = calculateN2015;
window.calculateS = calculateS;
window.calculateF = calculateF;
window.calculateU = calculateU;
window.calculateY = calculateY;

const calculateW = calculateW2015;
const calculateN = calculateN2015;

window.calculateFinalRisk = calculateFinalRisk;
window.generateReport = generateReport;
window.printReport = printReport;
window.exportPDF = exportPDF;

window.showSection = showSection;
window.showTab = showTab;

window.showGuide = showGuide;
window.showCustomModal = showCustomModal;

function showDimsModal() {
    const modal = document.getElementById('dims-modal');
    const triggerElem = document.getElementById('avg-dimension');

    // مختصات فیلد m را بگیریم
    const rect = triggerElem.getBoundingClientRect();

    modal.style.top = (window.scrollY + rect.bottom + 5) + 'px';
    modal.style.left = (window.scrollX + rect.left) + 'px';

    modal.style.display = 'block';
}


function closeDimsModal() {
    document.getElementById('dims-modal').style.display = 'none';
}

function calcMFromModal() {
    const inputs = document.querySelectorAll('#dims-table .dim-input');
    const dims = [];
    inputs.forEach(inp => {
        const val = parseFloat(inp.value);
        if (!isNaN(val) && val > 0) dims.push(val);
    });

    if (dims.length === 0) {
        showMessage('error', 'حداقل یک بُعد معتبر وارد کنید.');
        return;
    }

    let m = computeMFromDims(dims);
    document.getElementById('avg-dimension').value = m.toFixed(3);
    closeDimsModal();
    showMessage('success', `m از ابعاد محاسبه شد: ${m.toFixed(3)} m`);
}

function computeMFromDims(dims) {
    const n = dims.length; // تعداد واقعی ابعاد وارد شده
    const product = dims.reduce((acc, val) => acc * val, 1);
    let m = Math.pow(product, 1 / n); // توان 1/n درست
    return Math.max(0.001, Math.min(m, 2));
}



function switchMMode() {
    const selected = document.querySelector('input[name="m-mode"]:checked').value;
    const btnDims = document.getElementById('btn-dims');
    const refGuide = document.getElementById('m-ref-guide');
    if (selected === 'formula') {
        btnDims.style.display = 'inline-block';
        refGuide.style.display = 'none';
    } else {
        btnDims.style.display = 'none';
        refGuide.style.display = 'block';
    }
}

function showDimsModal() {
    document.getElementById('dims-modal').style.display = 'flex';
    document.getElementById('m-calc-result').innerHTML = '';
}

function closeDimsModal() {
    document.getElementById('dims-modal').style.display = 'none';
}

function calcMFromModal() {
    const inputs = document.querySelectorAll('#dims-table .dim-input');
    const dims = [];
    inputs.forEach(inp => {
        const val = parseFloat(inp.value);
        if (!isNaN(val) && val > 0) dims.push(val);
    });

    if (dims.length === 0) {
        showMessage('error', 'حداقل یک بُعد معتبر وارد کنید.');
        return;
    }

    const m = computeMFromDims(dims);
    const n = dims.length;
    const product = dims.reduce((acc, val) => acc * val, 1);

    // توضیح فرمول با مقدارگذاری
    const dimsText = dims.join(' × ');
    const formulaHTML = `
        <div style="direction:ltr; background:#f9f9f9; padding:8px; border-radius:5px; text-align:center;">
            <div style="font-size:1.2em; margin-bottom:4px;">
                m = ( ${dimsText} )<sup>1/${n}</sup>
            </div>
            <div style="color:#555; font-size:0.9em;">
                ∏ d<sub>i</sub> = ${product.toFixed(4)} &nbsp;|&nbsp; n = ${n}
            </div>
        </div>
        <div style="margin-top:6px; font-weight:bold;">m = ${m.toFixed(3)} m</div>
    `;

    document.getElementById('m-calc-result').innerHTML = formulaHTML;

    // قرار دادن در فیلد اصلی
    document.getElementById('avg-dimension').value = m.toFixed(3);
}


function computeMFromDims(dims) {
    const product = dims.reduce((acc, val) => acc * val, 1);
    let m = Math.pow(product, 1 / dims.length);
    return Math.max(0.001, Math.min(m, 2));
}



// =================== سیستم متغیرهای مشترک ===================
// نسخه امن - بدون وابستگی به توابع دیگر

(function() {
    'use strict';
    
    // تعریف شیء مرکزی
    const sharedVariables = {};
    
   // نقشه‌برداری متغیرها
const variableMapping = {
    'qi': ['qi', 'qi-fixed'],
    'qm': ['qm', 'qm-ventilation'],
    'b': ['section-width', 'section-width-t', 'width-alt'],
    'l': ['section-length', 'section-length-t', 'length-alt'],
    'area': ['section-area', 'section-area-t'],
    
    // ✅ اصلاح شده: لینک صحیح H+ و H- بین t و z
    'Hplus': ['height-above', 'height-above-z'],
    'Hminus': ['height-below', 'height-below-z'],
    
    'Z': ['access-sides'],
    'm': ['avg-dimension'],
    'S': ['safety-factor'],
    'T': ['fire-resistance']
};
    
    // تابع بروزرسانی متغیر مشترک
    function updateSharedVariable(varName, value) {
        if (!variableMapping[varName]) return;
        
        sharedVariables[varName] = value;
        
        const inputIds = variableMapping[varName];
        inputIds.forEach(id => {
            const element = document.getElementById(id);
            if (element && element !== document.activeElement) {
                element.value = value;
                element.classList.add('auto-filled');
                setTimeout(() => element.classList.remove('auto-filled'), 1000);
            }
        });
        
        try {
            localStorage.setItem(`shared_${varName}`, value);
        } catch(e) {
            console.warn('LocalStorage error:', e);
        }
    }
    
    // بارگذاری از localStorage
    function loadSharedVariables() {
        Object.keys(variableMapping).forEach(varName => {
            try {
                const savedValue = localStorage.getItem(`shared_${varName}`);
                if (savedValue) {
                    sharedVariables[varName] = savedValue;
                    const inputIds = variableMapping[varName];
                    inputIds.forEach(id => {
                        const element = document.getElementById(id);
                        if (element && !element.value) {
                            element.value = savedValue;
                        }
                    });
                }
            } catch(e) {
                console.warn('Load error for', varName, e);
            }
        });
    }
    
    // اتصال event listeners
    function attachSharedVariableListeners() {
        Object.entries(variableMapping).forEach(([varName, inputIds]) => {
            inputIds.forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    addSharedVariableBadge(element, varName, inputIds.length);
                    
                    element.addEventListener('input', (e) => {
                        updateSharedVariable(varName, e.target.value);
                    });
                    
                    element.addEventListener('change', (e) => {
                        updateSharedVariable(varName, e.target.value);
                    });
                }
            });
        });
    }
    
    // افزودن badge
    function addSharedVariableBadge(element, varName, count) {
        if (count <= 1) return;
        
        const parent = element.parentElement;
        if (!parent.classList.contains('shared-var-wrapper')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'shared-var-wrapper';
            parent.replaceChild(wrapper, element);
            wrapper.appendChild(element);
            
            const badge = document.createElement('span');
            badge.className = 'shared-var-badge';
            badge.textContent = '🔗';
            badge.title = `این مقدار با ${count - 1} فیلد دیگر مرتبط است`;
            wrapper.appendChild(badge);
        }
    }
    
    // ایجاد پنل مدیریت
    function createSharedVariablesPanel() {
        const backdrop = document.createElement('div');
        backdrop.className = 'floating-panel-backdrop';
        backdrop.id = 'shared-vars-backdrop';
        backdrop.onclick = closeSharedVariablesPanel;
        
        const panel = document.createElement('div');
        panel.className = 'floating-panel';
        panel.id = 'shared-vars-panel';
        
        let tableRows = '';
        Object.entries(variableMapping).forEach(([varName, inputIds]) => {
            if (inputIds.length > 1) {
                const currentValue = sharedVariables[varName] || '';
                tableRows += `
                    <tr>
                        <td><strong>${varName}</strong></td>
                        <td>
                            <input type="text" 
                                   class="shared-var-input" 
                                   id="panel-input-${varName}" 
                                   value="${currentValue}"
                                   placeholder="مقدار">
                        </td>
                        <td><span class="usage-badge">${inputIds.length}</span></td>
                        <td>
                            <button class="btn-apply" onclick="window.applySharedVariable('${varName}')">✓</button>
                            <button class="btn-clear" onclick="window.clearSharedVariable('${varName}')">✗</button>
                        </td>
                    </tr>
                `;
            }
        });
        
        panel.innerHTML = `
            <div class="panel-header">
                <h3>🔗 مدیریت متغیرهای مشترک</h3>
                <button onclick="window.closeSharedVariablesPanel()">✕</button>
            </div>
            <div class="panel-body">
                <p style="margin-bottom:1rem;color:#555;">
                    متغیرهای زیر در چند فرمول استفاده می‌شوند. تغییر هر کدام سایر فیلدها را هم به‌روز می‌کند.
                </p>
                <table class="shared-vars-table">
                    <thead>
                        <tr>
                            <th>متغیر</th>
                            <th>مقدار</th>
                            <th>تعداد</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>
                    <tbody>${tableRows}</tbody>
                </table>
                <div class="panel-footer">
                    <button class="btn-apply-all" onclick="window.applyAllSharedVariables()">✓ اعمال همه</button>
                    <button class="btn-clear-all" onclick="window.clearAllSharedVariables()">🗑️ پاک کردن</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(backdrop);
        document.body.appendChild(panel);
    }
    
    // نمایش پنل
    window.showSharedVariablesPanel = function() {
        let panel = document.getElementById('shared-vars-panel');
        let backdrop = document.getElementById('shared-vars-backdrop');
        
        if (!panel) {
            createSharedVariablesPanel();
            panel = document.getElementById('shared-vars-panel');
            backdrop = document.getElementById('shared-vars-backdrop');
        }
        
        // بروزرسانی مقادیر
        Object.entries(variableMapping).forEach(([varName, inputIds]) => {
            if (inputIds.length > 1) {
                const input = document.getElementById(`panel-input-${varName}`);
                if (input) {
                    input.value = sharedVariables[varName] || '';
                }
            }
        });
        
        backdrop.classList.add('show');
        panel.classList.add('show');
    };
    
    // بستن پنل
    window.closeSharedVariablesPanel = function() {
        const panel = document.getElementById('shared-vars-panel');
        const backdrop = document.getElementById('shared-vars-backdrop');
        if (panel) panel.classList.remove('show');
        if (backdrop) backdrop.classList.remove('show');
    };
    
    // اعمال یک متغیر
    window.applySharedVariable = function(varName) {
        const input = document.getElementById(`panel-input-${varName}`);
        if (input) {
            updateSharedVariable(varName, input.value);
            if (window.showMessage) {
                window.showMessage('success', `✓ ${varName} به‌روز شد`);
            }
        }
    };
    
    // پاک کردن یک متغیر
    window.clearSharedVariable = function(varName) {
        updateSharedVariable(varName, '');
        try {
            localStorage.removeItem(`shared_${varName}`);
        } catch(e) {}
        const input = document.getElementById(`panel-input-${varName}`);
        if (input) input.value = '';
        if (window.showMessage) {
            window.showMessage('info', `${varName} پاک شد`);
        }
    };
    
    // اعمال همه
    window.applyAllSharedVariables = function() {
        Object.keys(variableMapping).forEach(varName => {
            const input = document.getElementById(`panel-input-${varName}`);
            if (input && input.value) {
                updateSharedVariable(varName, input.value);
            }
        });
        if (window.showMessage) {
            window.showMessage('success', '✓ همه به‌روز شدند');
        }
    };
    
    // پاک کردن همه
    window.clearAllSharedVariables = function() {
        if (!confirm('پاک کردن تمام متغیرها؟')) return;
        
        Object.keys(variableMapping).forEach(varName => {
            window.clearSharedVariable(varName);
        });
    };
    
    // افزودن دکمه به هدر
    function addSharedVariablesButton() {
        const header = document.querySelector('header .header-container');
        if (header && !document.getElementById('btn-shared-vars')) {
            const btn = document.createElement('button');
            btn.id = 'btn-shared-vars';
            btn.className = 'btn-shared-vars';
            btn.innerHTML = '🔗 متغیرها';
            btn.onclick = window.showSharedVariablesPanel;
            header.insertBefore(btn, header.firstChild);
        }
    }
    
    // راه‌اندازی
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            loadSharedVariables();
            attachSharedVariableListeners();
            addSharedVariablesButton();
            console.log('✅ سیستم متغیرهای مشترک فعال شد');
        });
    } else {
        loadSharedVariables();
        attachSharedVariableListeners();
        addSharedVariablesButton();
        console.log('✅ سیستم متغیرهای مشترک فعال شد');
    }
    
})();

// پایان سیستم متغیرهای مشترک


// 🟢 لینک دوطرفه عرض (b) بین ضریب g و z
(function linkWidthFields() {
  const widthG = document.getElementById('section-width');   // عرض در تب g
  const widthZ = document.getElementById('section-width-z'); // عرض در تب z
  if (!widthG || !widthZ) return;

  let isSyncing = false;

  function syncFields(source, target) {
    if (isSyncing) return;
    isSyncing = true;
    target.value = source.value;
    target.classList.add('synced');
    setTimeout(() => target.classList.remove('synced'), 500);
    isSyncing = false;
  }

  // وقتی عرض در تب g تغییر کند، به z منتقل شود
  widthG.addEventListener('input', () => syncFields(widthG, widthZ));

  // وقتی در تب z تغییر کند، به g برگردد
  widthZ.addEventListener('input', () => syncFields(widthZ, widthG));

  // آیکون 🔗 اضافه برای اطلاع از لینک بودن
  [widthG, widthZ].forEach((el) => {
    const badge = document.createElement('span');
    badge.textContent = '🔗';
    badge.title = 'عرض بخش (b) پیوند داده‌شده بین g و z';
    badge.style.cssText = `
      position:absolute; right:6px; top:6px; font-size:0.9em;
      opacity:0.7; transition:opacity 0.3s ease;
    `;
    const wrapper = el.closest('.input-wrapper');
    if (wrapper && !wrapper.querySelector('.link-badge-b')) {
      badge.classList.add('link-badge-b');
      wrapper.style.position = 'relative';
      wrapper.appendChild(badge);
    }
  });
})();
