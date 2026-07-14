/* One-time generator for the 8 university office/department pages (EN + AR).
   Run: node generate-office-pages.js
   Produces static fragments in pages/en/*.html and pages/ar/*.html — after
   running, these are plain files like any other page and can be hand-edited.
*/
const fs = require('fs');
const path = require('path');

const OFFICES = [
  {
    file: 'facilities-dept.html',
    heroImg: 'colleges/coe-1.jpg',
    en: {
      eyebrow: 'University Offices', title: 'Facilities Department',
      intro: "The Facilities Department develops an ongoing renewal plan for campus facilities and residence infrastructure through an integrated program of campus and capital planning — covering new construction, maintenance, renovations, alterations and facility renewal projects. The department also manages and monitors procurement, food services, security and safety services.",
      services: ['Campus &amp; Capital Planning', 'Maintenance &amp; Renovations', 'Food Services', 'Security &amp; Safety'],
    },
    ar: {
      eyebrow: 'إدارات الجامعة', title: 'إدارة المرافق',
      intro: 'تعمل إدارة المرافق على تطوير خطة تجديد مستمرة لمرافق الحرم الجامعي والبنية التحتية للسكن الجامعي، من خلال برنامج متكامل للتخطيط العمراني والرأسمالي يغطي الإنشاءات الجديدة والصيانة والتجديدات. كما تشرف الإدارة على المشتريات وخدمات التغذية والأمن والسلامة.',
      services: ['التخطيط العمراني والرأسمالي', 'الصيانة والتجديدات', 'خدمات التغذية', 'الأمن والسلامة'],
    },
  },
  {
    file: 'purchasing-dept.html',
    heroImg: 'colleges/cob-2.jpg',
    en: {
      eyebrow: 'University Offices', title: 'Purchasing Department',
      intro: "The Purchasing Department manages the university's procurement process end-to-end — sourcing vendors, negotiating contracts, and ensuring every purchase meets Alfaisal's standards for quality, value and compliance.",
      services: ['Vendor Sourcing &amp; Contracts', 'Purchase Order Management', 'Compliance &amp; Quality Control', 'Asset Procurement'],
    },
    ar: {
      eyebrow: 'إدارات الجامعة', title: 'إدارة المشتريات',
      intro: 'تدير إدارة المشتريات عملية الشراء للجامعة من الألف إلى الياء — من اختيار الموردين والتفاوض على العقود، إلى ضمان مطابقة كل عملية شراء لمعايير الجودة والقيمة والامتثال في جامعة الفيصل.',
      services: ['اختيار الموردين والعقود', 'إدارة أوامر الشراء', 'الامتثال ومراقبة الجودة', 'شراء الأصول'],
    },
  },
  {
    file: 'finance-dept.html',
    heroImg: 'colleges/col-1.jpg',
    en: {
      eyebrow: 'University Offices', title: 'Finance &amp; Accounting',
      intro: "The Finance &amp; Accounting Department manages and controls the financial operations of Alfaisal University, including accounts receivable and payable, financial planning, budgeting and control, payroll, investment and treasury, and fixed asset management.",
      services: ['Accounts Receivable &amp; Payable', 'Budgeting &amp; Financial Planning', 'Payroll Systems', 'Investment &amp; Treasury'],
    },
    ar: {
      eyebrow: 'إدارات الجامعة', title: 'الشؤون المالية والمحاسبة',
      intro: 'تدير إدارة الشؤون المالية والمحاسبة العمليات المالية لجامعة الفيصل، بما في ذلك الذمم المدينة والدائنة، والتخطيط المالي والميزانية، ونظام الرواتب، والاستثمار والخزينة، وإدارة الأصول الثابتة.',
      services: ['الذمم المدينة والدائنة', 'التخطيط المالي والميزانية', 'أنظمة الرواتب', 'الاستثمار والخزينة'],
    },
  },
  {
    file: 'hr-dept.html',
    heroImg: 'colleges/com-1.jpg',
    en: {
      eyebrow: 'University Offices', title: 'Human Resources',
      intro: "The Human Resources Department is responsible for creating a healthy and motivating work environment characterized by openness, enthusiasm, trust, equality and collaboration. We believe people are the most important pillar of any organization — work blooms when its people thrive.",
      services: ['Talent Acquisition', 'Employee Development', 'Compensation &amp; Benefits', 'Workplace Culture'],
    },
    ar: {
      eyebrow: 'إدارات الجامعة', title: 'الموارد البشرية',
      intro: 'تتولى إدارة الموارد البشرية مسؤولية خلق بيئة عمل صحية ومحفزة تتسم بالانفتاح والحماس والثقة والمساواة والتعاون. نؤمن بأن الأفراد هم الركيزة الأهم لأي مؤسسة — فالعمل يزدهر عندما يزدهر أفراده.',
      services: ['استقطاب الكفاءات', 'تطوير الموظفين', 'التعويضات والمزايا', 'ثقافة بيئة العمل'],
    },
  },
  {
    file: 'it-services.html',
    heroImg: 'colleges/cos-1.jpg',
    en: {
      eyebrow: 'University Offices', title: 'IT Services',
      intro: "IT Services (ITS) provides technical support and advice on university IT services and resources to students, faculty and staff, collaborating with the campus community using innovative technologies to meet the university's strategic goals.",
      services: ['Helpdesk &amp; Technical Support', 'Campus Network &amp; Systems', 'Student &amp; Faculty IT Resources', 'Cybersecurity'],
    },
    ar: {
      eyebrow: 'إدارات الجامعة', title: 'خدمات تقنية المعلومات',
      intro: 'توفر إدارة خدمات تقنية المعلومات الدعم الفني والاستشارات حول خدمات وموارد تقنية المعلومات للطلاب وأعضاء هيئة التدريس والموظفين، بالتعاون مع مجتمع الحرم الجامعي باستخدام تقنيات مبتكرة لتحقيق الأهداف الاستراتيجية للجامعة.',
      services: ['الدعم الفني ومكتب المساعدة', 'شبكة وأنظمة الحرم الجامعي', 'موارد تقنية للطلاب وأعضاء التدريس', 'الأمن السيبراني'],
    },
  },
  {
    file: 'accreditation.html',
    heroImg: 'colleges/cop-1.jpg',
    en: {
      eyebrow: 'University Offices', title: 'Quality Assurance &amp; Accreditation',
      intro: "The Quality Assurance and Accreditation (QAA) department supports the university's strategic goals of quality, academic excellence and continual development. It serves as the link between Alfaisal University and external regulatory bodies, including the Ministry of Higher Education (MoHE) and the National Commission for Academic Accreditation &amp; Assessment (NCAAA).",
      services: ['NCAAA Program Accreditation', 'Quality Assurance Audits', 'MoHE Liaison', 'Continuous Improvement'],
    },
    ar: {
      eyebrow: 'إدارات الجامعة', title: 'ضمان الجودة والاعتماد الأكاديمي',
      intro: 'تدعم إدارة ضمان الجودة والاعتماد الأكاديمي (QAA) الأهداف الاستراتيجية للجامعة في الجودة والتميز الأكاديمي والتطوير المستمر. وتُعد حلقة الوصل بين جامعة الفيصل والجهات التنظيمية الخارجية، بما في ذلك وزارة التعليم والهيئة الوطنية للتقويم والاعتماد الأكاديمي (NCAAA).',
      services: ['اعتماد البرامج الأكاديمية (NCAAA)', 'تدقيق ضمان الجودة', 'التنسيق مع وزارة التعليم', 'التحسين المستمر'],
    },
  },
  {
    file: 'csr-dept.html',
    heroImg: 'colleges/cob-1.jpg',
    en: {
      eyebrow: 'University Offices', title: 'Corporate Social Responsibility',
      intro: "As a non-profit academic institution, Alfaisal is committed to creating value for society by integrating ethical, social and environmental considerations into every aspect of its operations. Through education, research and engagement, the university prepares graduates who are academically excellent, socially conscious and globally responsible.",
      services: ['Community Engagement', 'Sustainability Strategy', 'Stakeholder Partnerships', 'Volunteer Programs'],
    },
    ar: {
      eyebrow: 'إدارات الجامعة', title: 'المسؤولية الاجتماعية',
      intro: 'بصفتها مؤسسة أكاديمية غير ربحية، تلتزم جامعة الفيصل بخلق قيمة للمجتمع من خلال دمج الاعتبارات الأخلاقية والاجتماعية والبيئية في جميع جوانب عملها. ومن خلال التعليم والبحث والمشاركة المجتمعية، تُعِدّ الجامعة خريجين متميزين أكاديمياً وواعين اجتماعياً ومسؤولين عالمياً.',
      services: ['المشاركة المجتمعية', 'استراتيجية الاستدامة', 'الشراكات مع أصحاب المصلحة', 'برامج التطوع'],
    },
  },
  {
    file: 'edi.html',
    heroImg: 'colleges/coe-1.jpg',
    en: {
      eyebrow: 'University Offices', title: 'Equality, Diversity &amp; Inclusion',
      intro: "The Equality, Diversity &amp; Inclusion (EDI) Committee promotes diversity, equity and inclusion at Alfaisal University, ensuring everyone within the institution is included, respected and supported. The committee includes representatives from the University Council, Student Affairs, Research &amp; Graduate Studies and Human Resources, and reports directly to the University's President.",
      services: ['Policy &amp; Advocacy', 'Representation Across Departments', 'Termly Review Meetings', 'President-Level Reporting'],
    },
    ar: {
      eyebrow: 'إدارات الجامعة', title: 'المساواة والتنوع والشمول',
      intro: 'تعمل لجنة المساواة والتنوع والشمول (EDI) على تعزيز التنوع والإنصاف والشمول في جامعة الفيصل، وضمان شعور الجميع داخل المؤسسة بالانتماء والاحترام والدعم. وتضم اللجنة ممثلين عن مجلس الجامعة وشؤون الطلاب والبحث والدراسات العليا والموارد البشرية، وترفع تقاريرها مباشرة إلى رئيس الجامعة.',
      services: ['السياسات والدعوة', 'التمثيل عبر الإدارات', 'اجتماعات فصلية دورية', 'رفع التقارير لرئاسة الجامعة'],
    },
  },
];

function renderPage(office, lang) {
  const t = office[lang];
  const isAr = lang === 'ar';
  const home = isAr ? 'الرئيسية' : 'Home';
  const officesLabel = isAr ? 'الإدارات' : 'Offices';
  const whatWeDo = isAr ? 'ما نقوم به' : 'What We Do';
  const focusAreas = isAr ? 'مجالات العمل' : 'Focus Areas';
  const ctaTitle = isAr ? 'هل تحتاج للتواصل مع هذه الإدارة؟' : 'Need to reach this department?';
  const ctaBtn = isAr ? 'اتصل بنا' : 'Contact Us';

  const servicesHtml = t.services.map((s, i) => `
      <div class="value-card" data-reveal data-reveal-delay="${i % 4}">
        <span class="idx">0${i + 1}</span>
        <h3 class="h-md" style="font-size:1.05rem">${s}</h3>
      </div>`).join('');

  return `<section class="page-hero" style="min-height:38vh">
  <div class="hero-media"><img src="{{ROOT}}assets/images/${office.heroImg}" alt="${t.title.replace(/&amp;/g, '&')}" /></div>
  <div class="container hero-content">
    <div class="breadcrumb"><a href="{{ROOT}}index.html">${home}</a> <span>/</span> <span>${officesLabel}</span> <span>/</span> <span>${t.title}</span></div>
    <span class="eyebrow">${t.eyebrow}</span>
    <h1 class="display" style="font-size:clamp(1.8rem,3.6vw,2.8rem)">${t.title}</h1>
  </div>
</section>

<section class="section bg-paper">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow" style="justify-content:center">${whatWeDo}</span>
      <p class="lead center" style="margin-inline:auto">${t.intro}</p>
    </div>
    <div class="section-head center" style="margin-top:48px;margin-bottom:24px">
      <h2 class="h-lg">${focusAreas}</h2>
    </div>
    <div class="grid grid-4">${servicesHtml}
    </div>
  </div>
</section>

<section class="section bg-navy center" style="padding-block:64px">
  <div class="container">
    <h2 class="h-lg" style="max-width:560px;margin-inline:auto">${ctaTitle}</h2>
    <div class="hero-actions" style="justify-content:center;margin-top:24px">
      <a href="{{ROOT}}contact.html" class="btn btn-gold">${ctaBtn} <span class="btn-arrow">&rarr;</span></a>
    </div>
  </div>
</section>
`;
}

const root = __dirname;
OFFICES.forEach((office) => {
  ['en', 'ar'].forEach((lang) => {
    const outPath = path.join(root, 'pages', lang, office.file);
    fs.writeFileSync(outPath, renderPage(office, lang), 'utf8');
    console.log('wrote', outPath);
  });
});
console.log('\nDone. Add matching entries to PAGES in build.js, then run: node build.js');
