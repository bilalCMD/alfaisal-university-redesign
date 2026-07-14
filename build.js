/* Alfaisal University — 2026 Redesign — static build script
   Stitches partials/header + page content + partials/footer into final HTML.
   Run: node build.js
*/
const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const read = (p) => fs.readFileSync(path.join(ROOT_DIR, p), 'utf8');
const write = (p, content) => {
  const full = path.join(ROOT_DIR, p);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
};

const PAGES = [
  { key: 'home', file: 'index.html', title: 'Alfaisal University | Riyadh, Kingdom of Saudi Arabia', titleAr: 'جامعة الفيصل | الرياض، المملكة العربية السعودية', desc: 'Alfaisal University — a premier non-profit research university in Riyadh, Saudi Arabia, founded 2002.', descAr: 'جامعة الفيصل — جامعة بحثية رائدة غير ربحية في الرياض، المملكة العربية السعودية، تأسست عام 2002.' },
  { key: 'about', file: 'about.html', title: 'About Alfaisal | Vision, Mission & Leadership', titleAr: 'عن جامعة الفيصل | الرؤية والرسالة والقيادة', desc: 'Learn about Alfaisal University’s history, vision, mission, values and leadership.', descAr: 'تعرف على تاريخ جامعة الفيصل ورؤيتها ورسالتها وقيمها وقيادتها.' },
  { key: 'academics', file: 'academics.html', title: 'Academics | Alfaisal University', titleAr: 'الشؤون الأكاديمية | جامعة الفيصل', desc: 'Explore undergraduate and graduate academic programs at Alfaisal University.', descAr: 'استكشف البرامج الأكاديمية للبكالوريوس والدراسات العليا في جامعة الفيصل.' },
  { key: 'colleges', file: 'colleges.html', title: 'Our Colleges | Alfaisal University', titleAr: 'كلياتنا | جامعة الفيصل', desc: 'Six colleges spanning Business, Engineering, Medicine, Pharmacy, Science and Law.', descAr: 'ست كليات تشمل إدارة الأعمال والهندسة والطب والصيدلة والعلوم والقانون.' },

  // Explore Programs — dedicated per-college pages
  { key: 'programs-cob', file: 'programs-cob.html', title: 'College of Business Programs | Alfaisal University', titleAr: 'برامج كلية إدارة الأعمال | جامعة الفيصل', desc: 'BBA concentrations and executive certifications at the College of Business.', descAr: 'تخصصات البكالوريوس والشهادات المهنية التنفيذية في كلية إدارة الأعمال.' },
  { key: 'programs-coe', file: 'programs-coe.html', title: 'College of Engineering & Advanced Computing Programs | Alfaisal University', titleAr: 'برامج كلية الهندسة والحوسبة المتقدمة | جامعة الفيصل', desc: 'Ten engineering and computing majors at the College of Engineering & Advanced Computing.', descAr: 'عشرة تخصصات هندسية وحاسوبية في كلية الهندسة والحوسبة المتقدمة.' },
  { key: 'programs-com', file: 'programs-com.html', title: 'College of Medicine Programs | Alfaisal University', titleAr: 'برامج كلية الطب | جامعة الفيصل', desc: 'The MBBS program at the College of Medicine.', descAr: 'برنامج البكالوريوس في الطب والجراحة في كلية الطب.' },
  { key: 'programs-cop', file: 'programs-cop.html', title: 'College of Pharmacy Programs | Alfaisal University', titleAr: 'برامج كلية الصيدلة | جامعة الفيصل', desc: 'The Pharm.D. program at the College of Pharmacy.', descAr: 'برنامج دكتور صيدلة في كلية الصيدلة.' },
  { key: 'programs-cos', file: 'programs-cos.html', title: 'College of Science & General Studies Programs | Alfaisal University', titleAr: 'برامج كلية العلوم والدراسات العامة | جامعة الفيصل', desc: 'Life Sciences and the University Preparatory Program at the College of Science & General Studies.', descAr: 'برنامج علوم الحياة وبرنامج السنة التحضيرية الجامعية في كلية العلوم والدراسات العامة.' },
  { key: 'programs-col', file: 'programs-col.html', title: 'College of Law & International Relations Programs | Alfaisal University', titleAr: 'برامج كلية القانون والعلاقات الدولية | جامعة الفيصل', desc: 'LLB, Diplomacy and Public Policy programs at the College of Law & International Relations.', descAr: 'برامج البكالوريوس في القانون والدبلوماسية والسياسات العامة في كلية القانون والعلاقات الدولية.' },
  { key: 'admissions', file: 'admissions.html', title: 'Admissions | Alfaisal University', titleAr: 'القبول والتسجيل | جامعة الفيصل', desc: 'Admission requirements, application process, deadlines and scholarships.', descAr: 'متطلبات القبول وإجراءات التقديم والمواعيد النهائية والمنح الدراسية.' },
  { key: 'student-life', file: 'student-life.html', title: 'Student Life | Alfaisal University', titleAr: 'الحياة الطلابية | جامعة الفيصل', desc: 'Clubs, housing, campus experience and student support at Alfaisal.', descAr: 'الأندية والسكن وتجربة الحرم الجامعي ودعم الطلاب في جامعة الفيصل.' },
  { key: 'research', file: 'research.html', title: 'Research & Innovation | Alfaisal University', titleAr: 'البحث والابتكار | جامعة الفيصل', desc: 'Research centers, innovation and graduate studies at Alfaisal University.', descAr: 'مراكز البحث والابتكار والدراسات العليا في جامعة الفيصل.' },
  { key: 'news', file: 'news.html', title: 'News & Events | Alfaisal University', titleAr: 'الأخبار والفعاليات | جامعة الفيصل', desc: 'Latest news, stories and events from Alfaisal University.', descAr: 'أحدث الأخبار والقصص والفعاليات من جامعة الفيصل.' },
  { key: 'contact', file: 'contact.html', title: 'Contact Us | Alfaisal University', titleAr: 'اتصل بنا | جامعة الفيصل', desc: 'Get in touch with Alfaisal University — address, phone and map.', descAr: 'تواصل مع جامعة الفيصل — العنوان والهاتف والخريطة.' },

  // About family
  { key: 'exec-officers', file: 'exec-officers.html', title: 'Executive Officers | Alfaisal University', titleAr: 'المسؤولون التنفيذيون | جامعة الفيصل', desc: 'Meet the executive leadership team of Alfaisal University.', descAr: 'تعرف على فريق القيادة التنفيذية في جامعة الفيصل.' },
  { key: 'board-trustees', file: 'board-trustees.html', title: 'Board of Trustees | Alfaisal University', titleAr: 'مجلس الأمناء | جامعة الفيصل', desc: 'The Board of Trustees provides strategic oversight of Alfaisal University.', descAr: 'يوفر مجلس الأمناء الإشراف الاستراتيجي على جامعة الفيصل.' },
  { key: 'founders-partners', file: 'founders-partners.html', title: 'Founders & Partners | Alfaisal University', titleAr: 'المؤسسون والشركاء | جامعة الفيصل', desc: 'The founders and strategic partners behind Alfaisal University.', descAr: 'المؤسسون والشركاء الاستراتيجيون لجامعة الفيصل.' },
  { key: 'affiliations', file: 'affiliations.html', title: 'Affiliations | Alfaisal University', titleAr: 'الشراكات والانتماءات | جامعة الفيصل', desc: 'Global academic and research affiliations of Alfaisal University.', descAr: 'الشراكات الأكاديمية والبحثية العالمية لجامعة الفيصل.' },
  { key: 'chair-msg', file: 'chair-msg.html', title: "Chairman's Message | Alfaisal University", titleAr: 'كلمة رئيس مجلس الأمناء | جامعة الفيصل', desc: "A message from the Chairman of Alfaisal University's Board of Trustees.", descAr: 'كلمة من رئيس مجلس أمناء جامعة الفيصل.' },
  { key: 'president-msg', file: 'president-msg.html', title: "President's Message | Alfaisal University", titleAr: 'كلمة رئيس الجامعة | جامعة الفيصل', desc: 'A message from the President of Alfaisal University.', descAr: 'كلمة من رئيس جامعة الفيصل.' },

  // Academics extras
  { key: 'faculty', file: 'faculty.html', title: 'Faculty | Alfaisal University', titleAr: 'أعضاء هيئة التدريس | جامعة الفيصل', desc: 'Meet the faculty of Alfaisal University across all six colleges.', descAr: 'تعرف على أعضاء هيئة التدريس في جامعة الفيصل عبر الكليات الست.' },
  { key: 'ug-studies', file: 'ug-studies.html', title: 'Undergraduate Studies | Alfaisal University', titleAr: 'عمادة الدراسات الجامعية | جامعة الفيصل', desc: 'The Undergraduate Studies office at Alfaisal University.', descAr: 'عمادة الدراسات الجامعية في جامعة الفيصل.' },

  // University offices
  { key: 'facilities-dept', file: 'facilities-dept.html', title: 'Facilities Department | Alfaisal University', titleAr: 'إدارة المرافق | جامعة الفيصل', desc: 'Campus facilities, renewal planning and support services.', descAr: 'مرافق الحرم الجامعي وخطط التجديد وخدمات الدعم.' },
  { key: 'purchasing-dept', file: 'purchasing-dept.html', title: 'Purchasing Department | Alfaisal University', titleAr: 'إدارة المشتريات | جامعة الفيصل', desc: "Alfaisal University's procurement and purchasing operations.", descAr: 'عمليات الشراء والمشتريات في جامعة الفيصل.' },
  { key: 'finance-dept', file: 'finance-dept.html', title: 'Finance & Accounting | Alfaisal University', titleAr: 'الشؤون المالية والمحاسبة | جامعة الفيصل', desc: "Financial operations of Alfaisal University.", descAr: 'العمليات المالية في جامعة الفيصل.' },
  { key: 'hr-dept', file: 'hr-dept.html', title: 'Human Resources | Alfaisal University', titleAr: 'الموارد البشرية | جامعة الفيصل', desc: 'The Human Resources department at Alfaisal University.', descAr: 'إدارة الموارد البشرية في جامعة الفيصل.' },
  { key: 'it-services', file: 'it-services.html', title: 'IT Services | Alfaisal University', titleAr: 'خدمات تقنية المعلومات | جامعة الفيصل', desc: 'IT support and services for students, faculty and staff.', descAr: 'الدعم والخدمات التقنية للطلاب وأعضاء هيئة التدريس والموظفين.' },
  { key: 'accreditation', file: 'accreditation.html', title: 'Quality Assurance & Accreditation | Alfaisal University', titleAr: 'ضمان الجودة والاعتماد الأكاديمي | جامعة الفيصل', desc: 'NCAAA accreditation and quality assurance at Alfaisal University.', descAr: 'الاعتماد الأكاديمي وضمان الجودة في جامعة الفيصل.' },
  { key: 'csr-dept', file: 'csr-dept.html', title: 'Corporate Social Responsibility | Alfaisal University', titleAr: 'المسؤولية الاجتماعية | جامعة الفيصل', desc: "Alfaisal University's commitment to social responsibility and sustainability.", descAr: 'التزام جامعة الفيصل بالمسؤولية الاجتماعية والاستدامة.' },
  { key: 'edi', file: 'edi.html', title: 'Equality, Diversity & Inclusion | Alfaisal University', titleAr: 'المساواة والتنوع والشمول | جامعة الفيصل', desc: 'The EDI committee promoting inclusion at Alfaisal University.', descAr: 'لجنة المساواة والتنوع والشمول في جامعة الفيصل.' },

  // Utility
  { key: 'brochures', file: 'brochures.html', title: 'College Brochures | Alfaisal University', titleAr: 'كتيبات الكليات | جامعة الفيصل', desc: 'Download brochures for all six Alfaisal University colleges.', descAr: 'حمّل كتيبات كليات جامعة الفيصل الست.' },
  { key: 'alfaisal-apps', file: 'alfaisal-apps.html', title: 'Alfaisal Mobile App | Alfaisal University', titleAr: 'تطبيق الفيصل | جامعة الفيصل', desc: 'Download the My Alfaisal mobile app.', descAr: 'حمّل تطبيق My Alfaisal.' },
  { key: 'sitemap', file: 'sitemap.html', title: 'Sitemap | Alfaisal University', titleAr: 'خريطة الموقع | جامعة الفيصل', desc: 'A full sitemap of the Alfaisal University website.', descAr: 'خريطة كاملة لموقع جامعة الفيصل.' },

  // News articles
  { key: 'news-mentorship-award', file: 'news-mentorship-award.html', title: 'College of Medicine Celebrates the 9th Annual Mentorship Award | Alfaisal University', titleAr: 'كلية الطب تحتفل بحفل جائزة الإرشاد التاسع | جامعة الفيصل', desc: 'College of Medicine celebrates its 9th annual mentorship award ceremony.', descAr: 'كلية الطب تحتفل بحفل جائزة الإرشاد الأكاديمي التاسع.' },
  { key: 'news-ksu-research-forum', file: 'news-ksu-research-forum.html', title: 'Students Secure 2nd & 4th Place at KSU Medical Research Forum | Alfaisal University', titleAr: 'طلاب الفيصل يحصدون المركزين الثاني والرابع في ملتقى جامعة الملك سعود | جامعة الفيصل', desc: 'Alfaisal medical students place at the KSU Medical Research Forum.', descAr: 'طلاب الطب في الفيصل يحصدون مراكز متقدمة في ملتقى جامعة الملك سعود.' },
  { key: 'news-top-scientists', file: 'news-top-scientists.html', title: "Fourteen Alfaisal Faculty Featured in Stanford's World Top 2% Scientists List | Alfaisal University", titleAr: 'ضمن قائمة ستانفورد لأفضل 2% من العلماء عالمياً | جامعة الفيصل', desc: "Fourteen Alfaisal faculty recognized on Stanford's list of the world's top scientists.", descAr: '14 عضو هيئة تدريس من الفيصل ضمن قائمة ستانفورد لأفضل 2% من العلماء عالمياً.' },
  { key: 'news-engineering-council', file: 'news-engineering-council.html', title: 'Alfaisal Hosts Saudi Engineering Council Delegation | Alfaisal University', titleAr: 'جامعة الفيصل تستضيف وفد الهيئة السعودية للمهندسين | جامعة الفيصل', desc: 'Alfaisal University hosts a Saudi Engineering Council delegation for a guest talk.', descAr: 'جامعة الفيصل تستضيف وفد الهيئة السعودية للمهندسين في محاضرة ضيف.' },
  { key: 'news-career-fair', file: 'news-career-fair.html', title: 'Annual Career Fair Connects Students with Leading Saudi Employers | Alfaisal University', titleAr: 'معرض التوظيف السنوي يربط الطلاب بكبرى الشركات السعودية | جامعة الفيصل', desc: "Alfaisal's annual career fair connects students with top Saudi employers.", descAr: 'معرض التوظيف السنوي في الفيصل يربط الطلاب بكبرى الشركات السعودية.' },
  { key: 'news-alumni-newsletter', file: 'news-alumni-newsletter.html', title: 'Alumni & Placement Relations Releases Latest Alumni Newsletter | Alfaisal University', titleAr: 'إدارة الخريجين والتوظيف تصدر أحدث نشرة الخريجين | جامعة الفيصل', desc: 'The latest alumni newsletter from Alfaisal University.', descAr: 'أحدث نشرة خريجين من جامعة الفيصل.' },
];

function renderActive(str, activeKey) {
  return str.replace(/\{\{ACTIVE:([a-z-]+)\}\}/g, (_, k) => (k === activeKey ? 'active' : ''));
}

function buildLang(lang, root, altRootFn) {
  const header = read(`partials/header.${lang}.html`);
  const footer = read(`partials/footer.${lang}.html`);

  PAGES.forEach((page) => {
    const outPath = lang === 'en' ? page.file : path.join('ar', page.file);
    const contentPath = `pages/${lang}/${page.file}`;
    const content = read(contentPath).replace(/\{\{ROOT\}\}/g, root);

    let h = header.replace(/\{\{ROOT\}\}/g, root);
    let f = footer.replace(/\{\{ROOT\}\}/g, root);
    h = renderActive(h, page.key);

    if (lang === 'en') {
      h = h.replace(/\{\{AR_LINK\}\}/g, `ar/${page.file}`);
    } else {
      h = h.replace(/\{\{EN_LINK\}\}/g, `../${page.file}`);
    }

    const title = lang === 'en' ? page.title : page.titleAr;
    const desc = lang === 'en' ? page.desc : page.descAr;
    const htmlLang = lang === 'en' ? 'en' : 'ar';
    const dir = lang === 'en' ? 'ltr' : 'rtl';
    const altHref = lang === 'en' ? `ar/${page.file}` : `../${page.file}`;

    const shell = `<!DOCTYPE html>
<html lang="${htmlLang}" dir="${dir}" data-alt-href="${altHref}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
<meta name="description" content="${desc}" />
<link rel="icon" href="${root}assets/images/favicon.ico" type="image/x-icon" />
<script>(function(){try{var d=document.documentElement,cur=d.lang,pref=localStorage.getItem('alfaisalLang');if(pref&&pref!==cur){var alt=d.getAttribute('data-alt-href');if(alt){location.replace(alt);return;}}localStorage.setItem('alfaisalLang',cur);}catch(e){}})();</script>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="${root}css/style.css" />
</head>
<body>
${h}
<main>
${content}
</main>
${f}
</body>
</html>
`;
    write(outPath, shell);
    console.log('built', outPath);
  });
}

buildLang('en', '');
buildLang('ar', '../');

console.log('\nBuild complete.');
