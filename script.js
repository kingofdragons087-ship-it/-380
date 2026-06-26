'use strict';
const DICT = new Map();
let fileContent = null, fileName = null;
let googleCorrections = []; // قائمة تصحيحات Google

function add(obj) { for (const [en, ar] of Object.entries(obj)) { if (en && ar) DICT.set(en.toLowerCase().trim(), ar.trim()); } }

// ==================== الجزء 1: الأساسيات ====================
function buildDictPart1() {
    add({
        'hi':'مرحباً','hello':'مرحباً','hey':'هاي','good morning':'صباح الخير','good afternoon':'مساء الخير',
        'good evening':'مساء الخير','good night':'تصبح على خير','goodbye':'وداعاً','bye':'وداعاً',
        'see you':'أراك لاحقاً','welcome':'مرحباً','thank you':'شكراً','thanks':'شكراً',
        'please':'من فضلك','sorry':'آسف','excuse me':'عذراً','yes':'نعم','no':'لا','maybe':'ربما',
        'ok':'حسناً','fine':'جيد','great':'عظيم','nice':'جميل','good luck':'حظاً سعيداً',
        'congratulations':'تهانينا','happy birthday':'عيد ميلاد سعيد','happy new year':'سنة جديدة سعيدة',
        'how are you':'كيف حالك','i am fine':'أنا بخير','my name is':'اسمي',
        'nice to meet you':'سعيد بلقائك','take care':'اعتن بنفسك','have a nice day':'طاب يومك',
        'god bless you':'بارك الله فيك','well done':'أحسنت','no problem':'لا مشكلة',
        'dont worry':'لا تقلق','never mind':'لا يهم','of course':'بالطبع','here you are':'تفضل',
        'after you':'بعدك','bless you':'صحة','pardon':'عفواً','sorry to bother':'آسف على الإزعاج',
        'i':'أنا','you':'أنت','he':'هو','she':'هي','it':'هو/هي','we':'نحن','they':'هم',
        'me':'ني','him':'ه','her':'ها','us':'نا','them':'هم','my':'ي','your':'ك','his':'ه',
        'its':'ه','our':'نا','their':'هم','mine':'ملكي','yours':'ملكك','hers':'ملكها',
        'ours':'ملكنا','theirs':'ملكهم','myself':'نفسي','yourself':'نفسك','himself':'نفسه',
        'herself':'نفسها','itself':'نفسه','ourselves':'أنفسنا','yourselves':'أنفسكم',
        'themselves':'أنفسهم','who':'من','whom':'من','whose':'لمن','which':'أي','what':'ماذا',
        'am':'أكون','is':'يكون','are':'نكون','was':'كان','were':'كانوا','be':'يكون',
        'been':'كان','being':'كائن','will be':'سيكون','shall be':'سيكون',
        'the':'ال','a':'','an':'','this':'هذا','that':'ذلك','these':'هؤلاء','those':'أولئك',
        'here':'هنا','there':'هناك','when':'متى','where':'أين','why':'لماذا','how':'كيف',
        'how much':'كم','how many':'كم عدد','how long':'كم طول','how far':'كم بعد',
        'not':'لا','no':'لا','never':'أبداً','nothing':'لا شيء','nobody':'لا أحد',
        'and':'و','or':'أو','but':'لكن','because':'لأن','so':'لذا','if':'إذا','then':'ثم',
        'also':'أيضاً','too':'أيضاً','however':'لكن','although':'رغم أن','though':'رغم',
        'unless':'إلا إذا','until':'حتى','since':'منذ','once':'بمجرد أن',
        'all':'كل','some':'بعض','any':'أي','each':'كل','every':'كل','few':'قليل',
        'many':'كثير','much':'كثير','more':'أكثر','most':'معظم','less':'أقل',
        'of':'من','in':'في','on':'على','at':'في','to':'إلى','from':'من','with':'مع',
        'without':'بدون','for':'لـ','about':'حول','by':'بواسطة','into':'إلى داخل',
        'through':'عبر','during':'أثناء','before':'قبل','after':'بعد','above':'فوق',
        'below':'تحت','between':'بين','among':'بين','around':'حول','behind':'خلف',
        'in front of':'أمام','next to':'بجانب','near':'قريب من','far from':'بعيد عن',
        'inside':'داخل','outside':'خارج','up':'أعلى','down':'أسفل','over':'فوق',
        'under':'تحت','against':'ضد','toward':'باتجاه','along':'على طول','beyond':'وراء',
        'within':'ضمن','despite':'رغم','instead of':'بدلاً من','because of':'بسبب',
        'very':'جداً','really':'حقاً','quite':'تماماً','almost':'تقريباً','always':'دائماً',
        'usually':'عادةً','often':'غالباً','sometimes':'أحياناً','rarely':'نادراً',
        'now':'الآن','today':'اليوم','yesterday':'أمس','tomorrow':'غداً','soon':'قريباً',
        'later':'لاحقاً','early':'مبكراً','late':'متأخراً','already':'بالفعل','yet':'بعد',
        'still':'لا يزال','just':'للتو','only':'فقط','even':'حتى','quickly':'بسرعة',
        'slowly':'ببطء','carefully':'بعناية','easily':'بسهولة','certainly':'بالتأكيد',
        'probably':'ربما','possibly':'ربما','fortunately':'لحسن الحظ',
        'unfortunately':'لسوء الحظ','suddenly':'فجأة','immediately':'فوراً',
        'finally':'أخيراً','eventually':'في النهاية','actually':'في الواقع',
        'perhaps':'ربما','definitely':'بالتأكيد','absolutely':'بالتأكيد','exactly':'بالضبط',
        'completely':'تماماً','especially':'خاصة','together':'معاً','alone':'وحيد',
    });
}

// ==================== الجزء 2: صفات ====================
function buildDictPart2() {
    add({
        'good':'جيد','bad':'سيء','great':'عظيم','terrible':'فظيع','nice':'جميل',
        'beautiful':'جميل','ugly':'قبيح','pretty':'وسيم','handsome':'وسيم',
        'big':'كبير','small':'صغير','large':'ضخم','tiny':'دقيق','huge':'ضخم',
        'enormous':'ضخم جداً','massive':'هائل','giant':'عملاق','gigantic':'عملاق',
        'long':'طويل','short':'قصير','tall':'طويل','high':'عالي','low':'منخفض',
        'wide':'واسع','narrow':'ضيق','deep':'عميق','shallow':'ضحل',
        'thick':'سميك','thin':'رفيع','fat':'سمين','slim':'نحيف','skinny':'نحيف جداً',
        'heavy':'ثقيل','light':'خفيف','hard':'صلب/صعب','soft':'ناعم',
        'rough':'خشن','smooth':'أملس','sharp':'حاد','blunt':'غير حاد',
        'strong':'قوي','weak':'ضعيف','powerful':'قوي جداً','frail':'واهن',
        'fast':'سريع','slow':'بطيء','quick':'سريع','rapid':'سريع جداً',
        'hot':'حار','cold':'بارد','warm':'دافئ','cool':'بارد','freezing':'متجمد',
        'dry':'جاف','wet':'مبلل','moist':'رطب','damp':'ندي','soaked':'منقوع',
        'clean':'نظيف','dirty':'قذر','tidy':'مرتب','messy':'فوضوي','neat':'مرتب',
        'full':'ممتلئ','empty':'فارغ','rich':'غني','poor':'فقير','wealthy':'ثري',
        'expensive':'غالي','cheap':'رخيص','valuable':'ثمين','worthless':'عديم القيمة',
        'new':'جديد','old':'قديم','young':'شاب','ancient':'قديم جداً','elderly':'مسن',
        'modern':'حديث','traditional':'تقليدي','fresh':'طازج','stale':'بائت',
        'alive':'حي','dead':'ميت','healthy':'صحي','sick':'مريض','ill':'مريض',
        'happy':'سعيد','sad':'حزين','angry':'غاضب','calm':'هادئ','excited':'متحمس',
        'bored':'ضجر','tired':'متعب','sleepy':'نعسان','hungry':'جائع','thirsty':'عطشان',
        'brave':'شجاع','afraid':'خائف','scared':'خائف','frightened':'مرعوب',
        'kind':'لطيف','cruel':'قاسي','gentle':'لطيف','polite':'مهذب','rude':'وقح',
        'friendly':'ودود','hostile':'عدائي','honest':'صادق','loyal':'مخلص',
        'smart':'ذكي','stupid':'غبي','clever':'ذكي','wise':'حكيم','foolish':'أحمق',
        'right':'صحيح','wrong':'خاطئ','true':'حقيقي','false':'خاطئ','real':'حقيقي',
        'important':'مهم','trivial':'تافه','easy':'سهل','difficult':'صعب',
        'possible':'ممكن','impossible':'مستحيل','safe':'آمن','dangerous':'خطير',
        'free':'حر/مجاني','busy':'مشغول','ready':'جاهز','available':'متاح',
        'famous':'مشهور','common':'شائع','rare':'نادر','strange':'غريب',
        'wonderful':'رائع','awful':'فظيع','fantastic':'مذهل','excellent':'ممتاز',
        'perfect':'مثالي','amazing':'مذهل','incredible':'لا يصدق',
        'white':'أبيض','black':'أسود','red':'أحمر','blue':'أزرق','green':'أخضر',
        'yellow':'أصفر','orange':'برتقالي','purple':'أرجواني','pink':'وردي',
        'brown':'بني','gray':'رمادي','grey':'رمادي','golden':'ذهبي','silver':'فضي',
        'wooden':'خشبي','metallic':'معدني','plastic':'بلاستيكي','glass':'زجاجي',
        'dark':'مظلم','bright':'ساطع','magic':'سحري','holy':'مقدس',
        'legendary':'أسطوري','mythic':'خرافي','epic':'ملحمي','unique':'فريد',
        'special':'خاص','different':'مختلف','same':'نفس','whole':'كامل','entire':'كامل',
        'favorite':'مفضل','best':'أفضل','worst':'أسوأ','better':'أفضل','worse':'أسوأ',
        'popular':'شعبي','normal':'عادي','simple':'بسيط','complex':'معقد',
        'cowardly':'جبان','generous':'كريم','selfish':'أناني',
        'patient':'صبور','confident':'واثق','curious':'فضولي','jealous':'غيور',
        'elegant':'أنيق','graceful':'رشيق','mighty':'جبّار','magnificent':'عظيم',
        'splendid':'رائع','mysterious':'غامض','obvious':'واضح','secret':'سري',
        'sacred':'مقدس','divine':'إلهي','mortal':'فاني','immortal':'خالد',
        'temporary':'مؤقت','permanent':'دائم','eternal':'أبدي',
        'shining':'مشرق','radiant':'مشع','gloomy':'كئيب','shadowy':'مظلل',
        'hidden':'مخفي','deep':'عميق','vast':'شاسع',
        'cursed':'ملعون','blessed':'مبارك','enchanted':'مسحور','haunted':'مسكون',
        'forgotten':'منسي','lost':'مفقود','ruined':'مدمر','abandoned':'مهجور',
        'peaceful':'هادئ','quiet':'هادئ','silent':'صامت','noisy':'صاخب',
        'deadly':'مميت','lethal':'قاتل','fatal':'مميت',
        'poisonous':'سام','toxic':'سام','harmful':'ضار',
        'beneficial':'مفيد','useful':'مفيد','helpful':'مفيد','comfortable':'مريح',
    });
}

// ==================== الجزء 3: أفعال ====================
function buildDictPart3() {
    add({
        'have':'يملك','has':'يملك','had':'ملك','having':'امتلاك',
        'do':'يفعل','does':'يفعل','did':'فعل','done':'منجز','doing':'فعل',
        'make':'يصنع','made':'صنع','making':'صناعة','get':'يحصل','got':'حصل','gotten':'حصل',
        'go':'يذهب','went':'ذهب','gone':'ذهب','going':'ذهاب',
        'come':'يأتي','came':'جاء','coming':'مجيء',
        'see':'يرى','saw':'رأى','seen':'مرئي','seeing':'رؤية',
        'know':'يعرف','knew':'عرف','known':'معروف','knowing':'معرفة',
        'think':'يفكر','thought':'فكر','thinking':'تفكير',
        'want':'يريد','wanted':'أراد','wanting':'رغبة',
        'need':'يحتاج','needed':'احتاج','needing':'حاجة',
        'like':'يحب','liked':'أحب','liking':'إعجاب',
        'love':'يحب','loved':'أحب','loving':'محبة','beloved':'محبوب',
        'hate':'يكره','hated':'كره','hating':'كراهية',
        'feel':'يشعر','felt':'شعر','feeling':'شعور',
        'say':'يقول','said':'قال','saying':'قول',
        'tell':'يخبر','told':'أخبر','telling':'إخبار',
        'speak':'يتكلم','spoke':'تكلم','spoken':'متكلم','speaking':'تكلم',
        'talk':'يتحدث','talked':'تحدث','talking':'تحدث',
        'listen':'يستمع','listened':'استمع','listening':'استماع',
        'hear':'يسمع','heard':'سمع','hearing':'سمع',
        'look':'ينظر','looked':'نظر','looking':'نظر',
        'watch':'يشاهد','watched':'شاهد','watching':'مشاهدة',
        'read':'يقرأ','reading':'قراءة','write':'يكتب','wrote':'كتب','written':'مكتوب','writing':'كتابة',
        'work':'يعمل','worked':'عمل','working':'عمل',
        'play':'يلعب','played':'لعب','playing':'لعب',
        'run':'يجري','ran':'جرى','running':'جري',
        'walk':'يمشي','walked':'مشى','walking':'مشي',
        'fly':'يطير','flew':'طار','flown':'طار','flying':'طيران',
        'swim':'يسبح','swam':'سبح','swum':'سبح','swimming':'سباحة',
        'eat':'يأكل','ate':'أكل','eaten':'مأكول','eating':'أكل',
        'drink':'يشرب','drank':'شرب','drunk':'مشروب','drinking':'شرب',
        'sleep':'ينام','slept':'نام','sleeping':'نوم',
        'wake':'يستيقظ','woke':'استيقظ','woken':'مستيقظ','waking':'استيقاظ',
        'buy':'يشتري','bought':'اشترى','buying':'شراء',
        'sell':'يبيع','sold':'باع','selling':'بيع',
        'pay':'يدفع','paid':'دفع','paying':'دفع',
        'take':'يأخذ','took':'أخذ','taken':'مأخوذ','taking':'أخذ',
        'give':'يعطي','gave':'أعطى','given':'معطى','giving':'إعطاء',
        'bring':'يحضر','brought':'أحضر','bringing':'إحضار',
        'send':'يرسل','sent':'أرسل','sending':'إرسال',
        'receive':'يستلم','received':'استلم','receiving':'استلام',
        'find':'يجد','found':'وجد','finding':'إيجاد',
        'lose':'يفقد','lost':'فقد','losing':'فقدان',
        'search':'يبحث','searched':'بحث','searching':'بحث',
        'open':'يفتح','opened':'فتح','opening':'فتح',
        'close':'يغلق','closed':'أغلق','closing':'إغلاق',
        'start':'يبدأ','started':'بدأ','starting':'بدء',
        'stop':'يتوقف','stopped':'توقف','stopping':'توقف',
        'finish':'ينهي','finished':'أنهى','finishing':'إنهاء',
        'begin':'يبدأ','began':'بدأ','begun':'بدأ','beginning':'بداية',
        'end':'ينهي','ended':'أنهى','ending':'نهاية',
        'continue':'يستمر','continued':'استمر','continuing':'استمرار',
        'keep':'يحتفظ/يستمر','kept':'احتفظ/استمر','keeping':'احتفاظ',
        'hold':'يمسك','held':'أمسك','holding':'إمساك',
        'put':'يضع','putting':'وضع','set':'يضع/يضبط','setting':'ضبط',
        'let':'يسمح','letting':'سماح','allow':'يسمح','allowed':'سمح','allowing':'سماح',
        'help':'يساعد','helped':'ساعد','helping':'مساعدة',
        'try':'يحاول','tried':'حاول','trying':'محاولة',
        'use':'يستخدم','used':'استخدم','using':'استخدام',
        'move':'يحرك','moved':'حرك','moving':'تحريك',
        'change':'يغير','changed':'غير','changing':'تغيير',
        'turn':'يدور/يلتف','turned':'دار/التف','turning':'دوران',
        'grow':'ينمو','grew':'نما','grown':'نما','growing':'نمو',
        'build':'يبني','built':'بنى','building':'بناء',
        'create':'يخلق','created':'خلق','creating':'خلق',
        'destroy':'يدمر','destroyed':'دمر','destroying':'تدمير',
        'break':'يكسر','broke':'كسر','broken':'مكسور','breaking':'كسر',
        'fix':'يصلح','fixed':'أصلح','fixing':'إصلاح','repair':'يصلح',
        'cut':'يقطع','cutting':'قطع','kill':'يقتل','killed':'قتل','killing':'قتل',
        'die':'يموت','died':'مات','dying':'موت','dead':'ميت',
        'live':'يعيش','lived':'عاش','living':'عيش',
        'stay':'يبقى','stayed':'بقي','staying':'بقاء',
        'leave':'يغادر','left':'غادر','leaving':'مغادرة',
        'arrive':'يصل','arrived':'وصل','arriving':'وصول',
        'return':'يعود','returned':'عاد','returning':'عودة',
        'enter':'يدخل','entered':'دخل','entering':'دخول',
        'exit':'يخرج','exited':'خرج','exiting':'خروج',
        'wait':'ينتظر','waited':'انتظر','waiting':'انتظار',
        'sit':'يجلس','sat':'جلس','sitting':'جلوس',
        'stand':'يقف','stood':'وقف','standing':'وقوف',
        'fall':'يسقط','fell':'سقط','fallen':'ساقط','falling':'سقوط',
        'rise':'يرتفع','rose':'ارتفع','risen':'مرتفع','rising':'ارتفاع',
        'drop':'يسقط/يلقي','dropped':'أسقط/ألقى','dropping':'إسقاط',
        'pick':'يلتقط','picked':'التقط','picking':'التقاط',
        'carry':'يحمل','carried':'حمل','carrying':'حمل',
        'push':'يدفع','pushed':'دفع','pushing':'دفع',
        'pull':'يسحب','pulled':'سحب','pulling':'سحب',
        'throw':'يرمي','threw':'رمى','thrown':'مرمي','throwing':'رمي',
        'catch':'يمسك','caught':'أمسك','catching':'إمساك',
        'hit':'يضرب','hitting':'ضرب','fight':'يقاتل','fought':'قاتل','fighting':'قتال',
        'attack':'يهاجم','attacked':'هاجم','attacking':'هجوم',
        'defend':'يدافع','defended':'دافع','defending':'دفاع',
        'protect':'يحمي','protected':'حمى','protecting':'حماية',
        'save':'ينقذ/يحفظ','saved':'أنقذ/حفظ','saving':'إنقاذ/حفظ',
        'win':'يفوز','won':'فاز','winning':'فوز',
        'learn':'يتعلم','learned':'تعلم','learning':'تعلم',
        'teach':'يعلم','taught':'علم','teaching':'تعليم',
        'study':'يدرس','studied':'درس','studying':'دراسة',
        'remember':'يتذكر','remembered':'تذكر','remembering':'تذكر',
        'forget':'ينسى','forgot':'نسي','forgotten':'منسي','forgetting':'نسيان',
        'understand':'يفهم','understood':'فهم','understanding':'فهم',
        'believe':'يعتقد','believed':'اعتقد','believing':'اعتقاد',
        'hope':'يأمل','hoped':'أمل','hoping':'أمل',
        'wish':'يتمنى','wished':'تمنى','wishing':'تمني',
        'dream':'يحلم','dreamed':'حلم','dreaming':'حلم',
        'imagine':'يتخيل','imagined':'تخيل','imagining':'تخيل',
        'ask':'يسأل','asked':'سأل','asking':'سؤال',
        'answer':'يجيب','answered':'أجاب','answering':'إجابة',
        'call':'ينادي/يتصل','called':'نادى/اتصل','calling':'نداء/اتصال',
        'meet':'يقابل','met':'قابل','meeting':'مقابلة',
        'visit':'يزور','visited':'زار','visiting':'زيارة',
        'invite':'يدعو','invited':'دعا','inviting':'دعوة',
        'join':'ينضم','joined':'انضم','joining':'انضمام',
        'follow':'يتبع','followed':'تبع','following':'اتباع',
        'lead':'يقود','led':'قاد','leading':'قيادة',
        'show':'يعرض','showed':'عرض','shown':'معروض','showing':'عرض',
        'hide':'يخفي','hid':'أخفى','hidden':'مخفي','hiding':'إخفاء',
        'share':'يشارك','shared':'شارك','sharing':'مشاركة',
        'care':'يهتم','cared':'اهتم','caring':'اهتمام',
        'worry':'يقلق','worried':'قلق','worrying':'قلق',
        'trust':'يثق','trusted':'وثق','trusting':'ثقة',
        'promise':'يعد','promised':'وعد','promising':'واعد',
        'accept':'يقبل','accepted':'قبل','accepting':'قبول',
        'refuse':'يرفض','refused':'رفض','refusing':'رفض',
        'agree':'يوافق','agreed':'وافق','agreeing':'موافقة',
        'choose':'يختار','chose':'اختار','chosen':'مختار','choosing':'اختيار',
        'decide':'يقرر','decided':'قرر','deciding':'قرار',
        'plan':'يخطط','planned':'خطط','planning':'تخطيط',
        'prepare':'يحضر','prepared':'حضر','preparing':'تحضير',
        'cook':'يطبخ','cooked':'طبخ','cooking':'طبخ',
        'clean':'ينظف','cleaned':'نظف','cleaning':'تنظيف',
        'wash':'يغسل','washed':'غسل','washing':'غسيل',
        'wear':'يرتدي','wore':'ارتدى','worn':'مرتدي','wearing':'ارتداء',
        'drive':'يقود','drove':'قاد','driven':'مقود','driving':'قيادة',
        'ride':'يركب','rode':'ركب','ridden':'راكب','riding':'ركوب',
        'climb':'يتسلق','climbed':'تسلق','climbing':'تسلق',
        'jump':'يقفز','jumped':'قفز','jumping':'قفز',
        'dance':'يرقص','danced':'رقص','dancing':'رقص',
        'sing':'يغني','sang':'غنى','sung':'مغنى','singing':'غناء',
        'paint':'يرسم','painted':'رسم','painting':'رسم',
        'draw':'يرسم','drew':'رسم','drawn':'مرسوم','drawing':'رسم',
        'count':'يعد','counted':'عد','counting':'عد',
        'measure':'يقيس','measured':'قاس','measuring':'قياس',
        'weigh':'يزن','weighed':'وزن','weighing':'وزن',
        'cost':'يكلف','costing':'تكلفة','can':'يمكن','will':'سوف',
        'must':'يجب','should':'ينبغي','could':'يمكن','would':'سوف',
        'shall':'سوف','may':'قد','might':'ربما',
        'defeat':'يهزم','save':'ينقذ','destroy':'يدمر','protect':'يحمي',
        'forge':'يصنع','craft':'يصنع','enchant':'يسحر','summon':'يستدعي',
        'banish':'ينفي','teleport':'ينتقل','heal':'يشفي','restore':'يستعيد',
        'resurrect':'يحيي','revive':'ينعش','awaken':'يوقظ','evolve':'يطور',
        'upgrade':'ترقية','enhance':'تعزيز','explore':'يستكشف','discover':'يكتشف',
        'unlock':'يفتح','collect':'يجمع','trade':'يتاجر','train':'يتدرب',
        'shoot':'يطلق','cast':'يلقي','focus':'يركز','pray':'يصلي',
        'steal':'يسرق','sneak':'يتسلل','hunt':'يصطاد','track':'يتعقب',
        'equip':'يجهز','unequip':'ينزع','consume':'يستهلك',
        'plant':'يزرع','harvest':'يحصد','dig':'يحفر','mine':'ينقب',
    });
}

// ==================== الجزء 4: أسماء ====================
function buildDictPart4() {
    add({
        'world':'عالم','earth':'أرض','sun':'شمس','moon':'قمر','star':'نجم','sky':'سماء',
        'cloud':'سحاب','rain':'مطر','snow':'ثلج','wind':'رياح',
        'fire':'نار','water':'ماء','air':'هواء','ice':'جليد','storm':'عاصفة',
        'thunder':'رعد','lightning':'برق','rainbow':'قوس قزح',
        'mountain':'جبل','hill':'تل','valley':'وادي','plain':'سهل',
        'desert':'صحراء','forest':'غابة','jungle':'أدغال','beach':'شاطئ',
        'ocean':'محيط','sea':'بحر','lake':'بحيرة','river':'نهر','stream':'جدول',
        'waterfall':'شلال','island':'جزيرة','peninsula':'شبه جزيرة',
        'city':'مدينة','town':'بلدة','village':'قرية','country':'دولة',
        'kingdom':'مملكة','empire':'إمبراطورية','nation':'أمة',
        'home':'منزل','house':'بيت','room':'غرفة','door':'باب','window':'نافذة',
        'floor':'أرضية','wall':'جدار','roof':'سقف','garden':'حديقة','yard':'فناء',
        'street':'شارع','road':'طريق','bridge':'جسر','building':'مبنى','tower':'برج',
        'castle':'قلعة','palace':'قصر','school':'مدرسة','hospital':'مستشفى',
        'store':'متجر','shop':'محل','market':'سوق','bank':'بنك',
        'hotel':'فندق','restaurant':'مطعم','airport':'مطار','station':'محطة','port':'ميناء',
        'car':'سيارة','bus':'حافلة','train':'قطار','plane':'طائرة',
        'boat':'قارب','ship':'سفينة','bike':'دراجة','motorcycle':'دراجة نارية',
        'truck':'شاحنة','taxi':'تاكسي','ambulance':'إسعاف',
        'computer':'حاسوب','phone':'هاتف','television':'تلفاز','radio':'راديو',
        'camera':'كاميرا','watch':'ساعة','clock':'ساعة',
        'book':'كتاب','paper':'ورق','pen':'قلم','pencil':'قلم رصاص',
        'table':'طاولة','chair':'كرسي','bed':'سرير','sofa':'أريكة','desk':'مكتب',
        'food':'طعام','drink':'شراب','milk':'حليب','bread':'خبز','rice':'أرز',
        'meat':'لحم','fish':'سمك','chicken':'دجاج','egg':'بيض',
        'fruit':'فاكهة','vegetable':'خضار','apple':'تفاح','banana':'موز',
        'orange':'برتقال','grape':'عنب','lemon':'ليمون','strawberry':'فراولة',
        'coffee':'قهوة','tea':'شاي','juice':'عصير','beer':'بيرة','wine':'نبيذ',
        'sugar':'سكر','salt':'ملح','pepper':'فلفل','oil':'زيت','butter':'زبدة',
        'dog':'كلب','cat':'قطة','bird':'طائر','horse':'حصان','cow':'بقرة',
        'sheep':'خروف','pig':'خنزير','goat':'ماعز','chicken':'دجاجة',
        'lion':'أسد','tiger':'نمر','bear':'دب','wolf':'ذئب','fox':'ثعلب',
        'elephant':'فيل','monkey':'قرد','snake':'ثعبان','rabbit':'أرنب',
        'dragon':'تنين','spider':'عنكبوت','insect':'حشرة','butterfly':'فراشة',
        'monster':'وحش','beast':'وحش','creature':'مخلوق','giant':'عملاق',
        'demon':'شيطان','angel':'ملاك','ghost':'شبح','spirit':'روح','soul':'روح',
        'fairy':'جنية','vampire':'مصاص دماء','werewolf':'مستذئب',
        'elf':'إلف','dwarf':'قزم','orc':'أورك','troll':'غول','goblin':'عفريت',
        'gnome':'جنوم','halfling':'هالفينغ','undead':'ميت حي',
        'person':'شخص','people':'ناس','man':'رجل','woman':'امرأة',
        'child':'طفل','boy':'ولد','girl':'فتاة','baby':'رضيع',
        'friend':'صديق','enemy':'عدو','family':'عائلة','parent':'والد',
        'father':'أب','mother':'أم','son':'ابن','daughter':'ابنة',
        'brother':'أخ','sister':'أخت','husband':'زوج','wife':'زوجة',
        'king':'ملك','queen':'ملكة','prince':'أمير','princess':'أميرة',
        'hero':'بطل','villain':'شرير','leader':'قائد','follower':'تابع',
        'teacher':'معلم','student':'طالب','doctor':'طبيب','patient':'مريض',
        'police':'شرطة','soldier':'جندي','warrior':'محارب','knight':'فارس',
        'wizard':'ساحر','witch':'ساحرة','mage':'ساحر','priest':'كاهن',
        'god':'إله','goddess':'إلهة','blacksmith':'حداد','merchant':'تاجر','healer':'معالج',
        'hunter':'صياد','paladin':'فارس مقدس','druid':'درويد',
        'necromancer':'مستحضر أرواح','warlock':'ساحر أسود',
        'berserker':'هائج','assassin':'قاتل','ranger':'حارس','bard':'شاعر',
        'shaman':'شامان','monk':'راهب','sorcerer':'مشعوذ','cleric':'رجل دين',
        'barbarian':'بربري','gladiator':'مصارع','samurai':'ساموراي','ninja':'نينجا','pirate':'قرصان',
        'life':'حياة','death':'موت','birth':'ولادة','end':'نهاية',
        'time':'وقت','year':'سنة','month':'شهر','week':'أسبوع','day':'يوم',
        'night':'ليل','morning':'صباح','evening':'مساء','afternoon':'بعد ظهر',
        'hour':'ساعة','minute':'دقيقة','second':'ثانية','moment':'لحظة',
        'money':'مال','gold':'ذهب','silver':'فضة','coin':'عملة','treasure':'كنز',
        'wealth':'ثروة','price':'سعر','cost':'تكلفة','value':'قيمة',
        'name':'اسم','word':'كلمة','number':'رقم','letter':'حرف','sentence':'جملة',
        'color':'لون','shape':'شكل','size':'حجم','weight':'وزن','height':'ارتفاع',
        'sound':'صوت','music':'موسيقى','song':'أغنية','noise':'ضجيج','silence':'صمت',
        'love':'حب','hate':'كراهية','fear':'خوف','anger':'غضب','joy':'فرح',
        'sadness':'حزن','happiness':'سعادة','sorrow':'حزن','peace':'سلام',
        'war':'حرب','victory':'نصر','defeat':'هزيمة','battle':'معركة',
        'power':'قوة','strength':'قوة','weakness':'ضعف','skill':'مهارة',
        'knowledge':'معرفة','wisdom':'حكمة','intelligence':'ذكاء',
        'success':'نجاح','failure':'فشل','luck':'حظ','fortune':'حظ',
        'problem':'مشكلة','solution':'حل','question':'سؤال','answer':'جواب',
        'idea':'فكرة','plan':'خطة','goal':'هدف','dream':'حلم',
        'story':'قصة','secret':'سر','mystery':'غموض','truth':'حقيقة',
        'lie':'كذبة','mistake':'خطأ','accident':'حادث','danger':'خطر',
        'safety':'أمان','health':'صحة','disease':'مرض','medicine':'دواء',
        'body':'جسم','head':'رأس','face':'وجه','eye':'عين','nose':'أنف',
        'mouth':'فم','ear':'أذن','hand':'يد','foot':'قدم','arm':'ذراع',
        'leg':'ساق','heart':'قلب','blood':'دم','bone':'عظم','skin':'جلد',
        'hair':'شعر','mind':'عقل','brain':'دماغ','memory':'ذاكرة',
        'feeling':'شعور','emotion':'عاطفة','pain':'ألم','pleasure':'متعة',
        'sword':'سيف','blade':'نصل','dagger':'خنجر','axe':'فأس','hammer':'مطرقة',
        'spear':'رمح','lance':'رمح طويل','bow':'قوس','arrow':'سهم','crossbow':'قوس ونشاب',
        'staff':'عصا','wand':'صولجان','scepter':'صولجان ملكي','rod':'قضيب',
        'shield':'درع','armor':'درع','helmet':'خوذة','boots':'أحذية','gloves':'قفازات',
        'ring':'خاتم','amulet':'تميمة','necklace':'قلادة','bracelet':'سوار','crown':'تاج',
        'belt':'حزام','cloak':'عباءة','robe':'رداء','cape':'رداء',
        'potion':'جرعة','scroll':'مخطوطة','elixir':'إكسير','crystal':'بلورة',
        'gem':'جوهرة','diamond':'ألماس','ruby':'ياقوت','sapphire':'ياقوت أزرق','emerald':'زمرد',
        'scale':'حرشفة','scales':'حراشف','flame':'لهب','darkness':'ظلام','evil':'شر',
    });
}

// ==================== الجزء 5: ألعاب ====================
function buildDictPart5() {
    add({
        'game':'لعبة','player':'لاعب','level':'مستوى','xp':'خبرة','experience':'خبرة',
        'points':'نقاط','score':'نتيجة','rank':'رتبة','health':'صحة','hp':'نقاط صحة',
        'mana':'مانا','mp':'نقاط سحر','stamina':'طاقة','energy':'طاقة',
        'attack':'هجوم','defense':'دفاع','damage':'ضرر','critical':'حرج',
        'dodge':'مراوغة','block':'صد','parry':'تفادي','hit':'إصابة','miss':'خطأ',
        'speed':'سرعة','inventory':'مخزون','equipment':'معدات','item':'غرض','loot':'غنيمة',
        'quest':'مهمة','mission':'مهمة','objective':'هدف','reward':'مكافأة',
        'achievement':'إنجاز','trophy':'كأس','boss':'زعيم','enemy':'عدو','ally':'حليف',
        'party':'فريق','guild':'نقابة','clan':'عشيرة','team':'فريق',
        'save':'حفظ','load':'تحميل','menu':'قائمة','settings':'إعدادات','options':'خيارات',
        'quit':'خروج','exit':'خروج','start':'بدء','pause':'إيقاف','resume':'استئناف',
        'easy':'سهل','normal':'عادي','hard':'صعب','expert':'خبير','master':'محترف',
        'tutorial':'تعليمي','level up':'رفع مستوى','skill tree':'شجرة مهارات',
        'buff':'تعزيز','debuff':'إضعاف','aura':'هالة','blessing':'بركة','curse':'لعنة',
        'heal':'شفاء','cure':'علاج','revive':'إنعاش','teleport':'انتقال','portal':'بوابة',
        'map':'خريطة','minimap':'خريطة مصغرة','chat':'دردشة','trade':'تجارة',
        'shop':'متجر','buy':'شراء','sell':'بيع','price':'سعر','free':'مجاني','premium':'مميز',
        'online':'متصل','offline':'غير متصل','server':'خادم','login':'دخول','logout':'خروج',
        'account':'حساب','profile':'ملف','password':'كلمة مرور','username':'اسم مستخدم',
        'multiplayer':'متعدد','single player':'فردي','co-op':'تعاوني',
        'pvp':'ضد لاعبين','pve':'ضد بيئة','raid':'غارة','dungeon':'زنزانة',
        'open world':'عالم مفتوح','survival':'بقاء','crafting':'صناعة','mining':'تعدين',
        'fishing':'صيد','building':'بناء','mount':'مركوب','pet':'أليف',
        'class':'فئة','race':'عرق','warrior':'محارب','mage':'ساحر','rogue':'لص','priest':'كاهن',
        'common':'شائع','rare':'نادر','epic':'ملحمي','legendary':'أسطوري','mythic':'خرافي','unique':'فريد',
        'upgrade':'ترقية','enhance':'تعزيز','evolve':'تطوير',
        'daily':'يومي','weekly':'أسبوعي','monthly':'شهري','event':'حدث','season':'موسم',
        'battle pass':'بطاقة معركة','victory':'انتصار','defeat':'هزيمة','battle':'معركة',
    });
}

// ==================== الجزء 6: مركبات وعبارات ====================
function buildDictPart6() {
    add({
        'new game':'لعبة جديدة','load game':'تحميل اللعبة','save game':'حفظ اللعبة',
        'quit game':'إنهاء اللعبة','game over':'انتهت اللعبة','try again':'حاول مجدداً',
        'health potion':'جرعة صحة','mana potion':'جرعة مانا',
        'fire sword':'سيف النار','dragon shield':'درع التنين',
        'magic ring':'خاتم سحري','ring of power':'خاتم القوة',
        'dark forest':'غابة مظلمة','magic sword':'سيف سحري',
        'holy shield':'درع مقدس','dragon slayer':'قاتل التنين',
        'old wizard':'ساحر قديم','brave warrior':'محارب شجاع',
        'dark dragon':'تنين مظلم','fire dragon':'تنين النار',
        'ancient dragon':'تنين قديم','dragon kingdom':'مملكة التنين',
        'welcome to':'مرحباً بكم في','in the':'في ال','for you':'لك',
        'made from':'مصنوع من','all enemies':'جميع الأعداء','your party':'فريقك',
        'health points':'نقاط صحة','mana points':'نقاط مانا',
        'eternal flame':'لهب أبدي','eternal darkness':'ظلام أبدي',
        'ancient evil':'شر قديم','dark magic':'سحر أسود',
        'magic staff':'عصا سحرية','magic crystal':'بلورة سحرية',
        'legendary sword':'سيف أسطوري','legendary weapon':'سلاح أسطوري',
        'gold coins':'قطع ذهبية','gold coin':'قطعة ذهبية',
        'dragon scale':'حرشفة تنين','dragon scales':'حراشف تنين',
        'dragon scale shield':'درع حرشفة التنين',
        'forgotten temple':'معبد منسي','dark cave':'كهف مظلم',
        'hidden treasure':'كنز مخفي','secret passage':'ممر سري',
        'fire ball':'كرة النار','ice storm':'عاصفة الجليد','healing light':'ضوء الشفاء',
        'shadow strike':'ضربة الظل','brave knight':'فارس شجاع',
        'dark wizard':'ساحر الظلام','powerful weapon':'سلاح قوي',
        'dragon heart':'قلب تنين','dragon claw':'مخلب تنين','dragon fang':'ناب تنين',
        'dragon eye':'عين تنين','dragon wing':'جناح تنين','phoenix feather':'ريشة فينيق',
        'ancient relic':'ذخيرة قديمة','lost treasure':'كنز مفقود',
        'enchanted forest':'غابة مسحورة','haunted castle':'قلعة مسكونة',
        'forgotten ruins':'أطلال منسية','cursed temple':'معبد ملعون',
        'blessed sword':'سيف مبارك','cursed blade':'نصل ملعون',
        'iron sword':'سيف حديدي','steel sword':'سيف فولاذي','golden sword':'سيف ذهبي',
        'diamond sword':'سيف ألماسي','crystal sword':'سيف بلوري','shadow blade':'نصل الظل',
        'thunder hammer':'مطرقة الرعد','storm breaker':'كاسر العاصفة',
        'fire mage':'ساحر نار','ice mage':'ساحر جليد','storm mage':'ساحر عاصفة',
        'shadow mage':'ساحر ظل','light mage':'ساحر نور','dark mage':'ساحر ظلام',
        'wise wizard':'ساحر حكيم','mighty warrior':'محارب جبار',
        'skilled archer':'رامي ماهر','cunning rogue':'لص ماكر',
        'holy priest':'كاهن مقدس','dark assassin':'قاتل مظلم','powerful mage':'ساحر قوي',
        'heal party':'شفاء الفريق','cure poison':'علاج السم','remove curse':'إزالة اللعنة',
        'break enchantment':'كسر التطويع','summon creature':'استدعاء مخلوق',
        'banish demon':'نفي شيطان','control minds':'التحكم بالعقول',
        'read thoughts':'قراءة الأفكار','become invisible':'الاختفاء',
        'see the future':'رؤية المستقبل','talk to animals':'التحدث مع الحيوانات',
        'fly in the sky':'الطيران في السماء','breathe underwater':'التنفس تحت الماء',
        'walk through walls':'المشي عبر الجدران','teleport anywhere':'الانتقال لأي مكان',
        'stop time':'إيقاف الزمن','bring back the dead':'إعادة الموتى',
        'destroy everything':'تدمير كل شيء','create life':'خلق الحياة',
        'control the elements':'التحكم بالعناصر','master of magic':'سيد السحر',
        'lord of dragons':'سيد التنانين','king of kings':'ملك الملوك',
        'god of war':'إله الحرب','goddess of love':'إلهة الحب',
        'spirit of nature':'روح الطبيعة','demon of chaos':'شيطان الفوضى',
        'angel of death':'ملاك الموت','guardian of light':'حارس النور',
        'keeper of secrets':'حافظ الأسرار','master of shadows':'سيد الظلال',
    });
}

// ==================== الجزء 7: جمل كاملة ====================
function buildDictPart7() {
    add({
        'hello brave warrior':'مرحباً أيها المحارب الشجاع',
        'the dark dragon is coming':'التنين المظلم قادم',
        'find the magic sword':'ابحث عن السيف السحري',
        'i can forge a powerful weapon':'أستطيع أن أصنع سلاحاً قوياً',
        'welcome to the dragon kingdom':'مرحباً بكم في مملكة التنين',
        'game over - try again':'انتهت اللعبة - حاول مجدداً',
        'a brave knight must defeat the dark wizard and save the kingdom from eternal darkness':'يجب على الفارس الشجاع أن يهزم ساحر الظلام وينقذ المملكة من الظلام الأبدي',
        'find the magic crystal hidden deep inside the dark cave':'اعثر على البلورة السحرية المخفية في أعماق الكهف المظلم',
        'legendary sword of light and 5000 gold coins':'سيف النور الأسطوري و 5000 قطعة ذهبية',
        'welcome brave warrior the kingdom needs your help to defeat the ancient evil':'مرحباً أيها المحارب الشجاع المملكة بحاجة لمساعدتك لهزيمة الشر القديم',
        'take this magic staff it will protect you from the dark magic':'خذ هذه العصا السحرية ستحميك من السحر الأسود',
        'i can forge the most powerful weapon you have ever seen':'أستطيع أن أصنع أقوى سلاح رأيته على الإطلاق',
        'the dark dragon is coming':'التنين المظلم قادم',
        'we must prepare for battle':'يجب أن نستعد للمعركة',
        'the kingdom is in danger':'المملكة في خطر',
        'only you can save us now':'أنت فقط من يستطيع إنقاذنا الآن',
        'bring me the ancient relic':'أحضر لي الذخيرة القديمة',
        'the prophecy has come true':'لقد تحققت النبوءة',
        'darkness falls over the land':'الظلام يخيم على الأرض',
        'light will prevail':'النور سينتصر',
        'the final battle begins':'المعركة النهائية تبدأ',
        'victory is ours':'النصر لنا',
        'you have been defeated':'لقد هزمت',
        'try again brave warrior':'حاول مرة أخرى أيها المحارب الشجاع',
        'your quest is complete':'لقد اكتملت مهمتك',
        'a new adventure awaits':'مغامرة جديدة في الانتظار',
        'the ancient dragon awakens':'التنين القديم يستيقظ',
        'the dark lord returns':'سيد الظلام يعود',
        'heroes of the realm unite':'أبطال المملكة يتحدون',
        'the sword of destiny has been found':'تم العثور على سيف القدر',
        'the curse has been lifted':'تم رفع اللعنة',
        'peace returns to the kingdom':'يعود السلام إلى المملكة',
        'thank you brave hero':'شكراً لك أيها البطل الشجاع',
        'you saved our world':'لقد أنقذت عالمنا',
        'your legend will live forever':'أسطورتك ستعيش إلى الأبد',
        'the end':'النهاية','to be continued':'يتبع',
        'game saved successfully':'تم حفظ اللعبة بنجاح',
        'game loaded successfully':'تم تحميل اللعبة بنجاح',
        'press any key to continue':'اضغط أي زر للمتابعة',
        'loading please wait':'جاري التحميل الرجاء الانتظار',
        'connecting to server':'جاري الاتصال بالخادم',
        'connection lost':'انقطع الاتصال','reconnecting':'إعادة الاتصال',
        'please try again later':'الرجاء المحاولة لاحقاً',
        'error occurred':'حدث خطأ',
        'please restart the game':'الرجاء إعادة تشغيل اللعبة',
        'are you sure you want to quit':'هل أنت متأكد أنك تريد الخروج',
        'all unsaved progress will be lost':'سيتم فقدان كل التقدم غير المحفوظ',
        'yes i am sure':'نعم أنا متأكد','no take me back':'لا أعدني',
        'select your character':'اختر شخصيتك','choose your class':'اختر فئتك',
        'enter your name':'أدخل اسمك','start your adventure':'ابدأ مغامرتك',
        'welcome to the world of dragons':'مرحباً بك في عالم التنانين',
        'may the gods be with you':'لتكن الآلهة معك',
        'good luck brave one':'حظاً سعيداً أيها الشجاع',
    });
}

// ==================== بناء القاموس ====================
function buildFullDict() {
    buildDictPart1(); buildDictPart2(); buildDictPart3();
    buildDictPart4(); buildDictPart5(); buildDictPart6(); buildDictPart7();
    console.log('✅ القاموس الأسطوري: '+DICT.size.toLocaleString()+' كلمة وجملة');
}

// ==================== تصحيحات Google الإملائية ====================
const GOOGLE_FIXES = new Map([
    ['مرحبا', 'مرحباً'], ['اهلا', 'أهلاً'], ['شكرا', 'شكراً'], ['عفوا', 'عفواً'],
    ['صحه', 'صحة'], ['جرعه', 'جرعة'], ['مشكله', 'مشكلة'], ['قصه', 'قصة'],
    ['فكره', 'فكرة'], ['مهاره', 'مهارة'], ['معرفه', 'معرفة'], ['حكمه', 'حكمة'],
    ['قوه', 'قوة'], ['ضعف', 'ضعف'], ['هزيمه', 'هزيمة'], ['معركه', 'معركة'],
    ['مملكه', 'مملكة'], ['مدينه', 'مدينة'], ['قريه', 'قرية'], ['غابه', 'غابة'],
    ['سعاده', 'سعادة'], ['كراهيه', 'كراهية'], ['شجاعه', 'شجاعة'],
    ['اللعبه', 'اللعبة'], ['النهايه', 'النهاية'], ['البدايه', 'البداية'],
    ['الحرب', 'الحرب'], ['السحر', 'السحر'], ['التنين', 'التنين'],
    ['المحارب', 'المحارب'], ['السيف', 'السيف'], ['الدرع', 'الدرع'],
    ['جرعة الصحة', 'جرعة صحة'], ['جرعة المانا', 'جرعة مانا'],
    ['سيف الناري', 'سيف النار'], ['درع التنين', 'درع التنين'],
    ['المحارب الشجاع', 'محارب شجاع'], ['الساحر القديم', 'ساحر قديم'],
    ['التنين المظلم', 'تنين مظلم'], ['الغابة المظلمة', 'غابة مظلمة'],
    ['مملكة التنانين', 'مملكة التنين'], ['انتهت اللعبه', 'انتهت اللعبة'],
    ['حاول مره اخرى', 'حاول مرة أخرى'], ['مرحبا بكم', 'مرحباً بكم'],
]);

// دالة تصحيح أخطاء Google الإملائية
function fixGoogleSpelling(text) {
    let fixed = text;
    for (const [wrong, correct] of GOOGLE_FIXES) {
        const regex = new RegExp(wrong.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        fixed = fixed.replace(regex, correct);
    }
    return fixed;
}

// ==================== حفظ واسترجاع ====================
const SK = 'legendary_fixes';
function loadFixes() { try { const d = localStorage.getItem(SK); if (d) { JSON.parse(d).forEach(f => { if (f.en && f.ar) DICT.set(f.en, f.ar); }); } } catch (e) {} }
function saveFixes() { try { const fixes = []; DICT.forEach((v, k) => { if (k && v) fixes.push({ en: k, ar: v }); }); localStorage.setItem(SK, JSON.stringify(fixes)); } catch (e) {} }

// ==================== ترجمة ====================
function translateText(text) {
    if (!text || !text.trim()) return text;
    const lower = text.toLowerCase().trim();
    if (DICT.has(lower)) return DICT.get(lower);
    const tokens = text.split(/(\s+|[.,!?;:'"()\[\]\{\}\-–—])/);
    let result = '';
    for (let i = 0; i < tokens.length; i++) {
        const t = tokens[i];
        if (!t || /^[\s.,!?;:'"()\[\]\{\}\-–—]+$/.test(t)) { result += t; continue; }
        const c = t.toLowerCase().replace(/[^a-z0-9 ]/g, '');
        let found = false;
        for (let len = 10; len >= 2; len--) {
            if (i + len <= tokens.length) {
                const comp = [];
                for (let j = 0; j < len; j++) comp.push(tokens[i + j].toLowerCase().replace(/[^a-z0-9 ]/g, ''));
                const phrase = comp.join(' ');
                if (DICT.has(phrase)) { result += DICT.get(phrase); i += len - 1; found = true; break; }
            }
        }
        if (found) continue;
        if (DICT.has(c)) { result += DICT.get(c); continue; }
        if (c.endsWith('s') && DICT.has(c.slice(0, -1))) { result += DICT.get(c.slice(0, -1)); continue; }
        if (c.endsWith('ing') && DICT.has(c.slice(0, -3))) { result += DICT.get(c.slice(0, -3)); continue; }
        if (c.endsWith('ed') && DICT.has(c.slice(0, -2))) { result += DICT.get(c.slice(0, -2)); continue; }
        result += t;
    }
    return result;
}

function extractValuesOnly(text) {
    const values = [];
    let protected_text = text
        .replace(/"([^"]+)"\s*:/g, (full, key) => '"' + key + '":')
        .replace(/:\s*"([^"]*)"/g, (full, value) => { values.push(value); return ': "⟨' + (values.length - 1) + '⟩"'; })
        .replace(/=\s*(.*)/g, (full, value) => { values.push(value); return '= ⟨' + (values.length - 1) + '⟩'; })
        .replace(/>([^<]+)</g, (full, value) => { values.push(value); return '>⟨' + (values.length - 1) + '⟩<'; });
    if (values.length === 0 && text.trim()) {
        const lines = text.split('\n').filter(line => line.trim());
        protected_text = lines.map((line, i) => '⟨' + i + '⟩').join('\n');
        lines.forEach(line => values.push(line));
    }
    return { protected_text, values };
}

function restoreValues(protected_text, values) {
    return protected_text.replace(/⟨(\d+)⟩/g, (full, n) => values[parseInt(n)] || '');
}

function translate(text) {
    if (!text) return '';
    const { protected_text, values } = extractValuesOnly(text);
    return restoreValues(protected_text, values.map(v => translateText(v)));
}

// ==================== Google API ====================
async function googleAPI(text) {
    try {
        const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=' + encodeURIComponent(text.substring(0, 4000));
        const r = await fetch(url);
        if (!r.ok) return null;
        const d = await r.json();
        return d?.[0]?.filter(x => x?.[0]).map(x => x[0]).join('') || null;
    } catch (e) { return null; }
}

// ==================== واجهة ====================
function msg(m, t) {
    const c = document.getElementById('notifications'); if (!c) return;
    const n = document.createElement('div'); n.className = 'notification ' + (t || 'info'); n.textContent = m; c.appendChild(n);
    setTimeout(() => { n.style.opacity = '0'; n.style.transition = 'opacity 0.5s'; setTimeout(() => n.remove(), 500); }, 3000);
}

async function dt(mode) {
    const st = document.getElementById('sourceText'), tt = document.getElementById('translatedText');
    if (!st || !tt) return;
    const text = st.value.trim() || fileContent;
    if (!text) { msg('⚠️ أدخل نص', 'warning'); return; }
    let result = '';
    try {
        const { protected_text, values } = extractValuesOnly(text);
        const dictResults = values.map(v => translateText(v));
        if (mode === 'dict') {
            result = restoreValues(protected_text, dictResults);
        } else {
            const joined = values.join(' ||| ');
            const gResult = await googleAPI(joined);
            if (gResult) {
                const googleTexts = gResult.split(' ||| ');
                // ⭐ تصحيح أخطاء Google الإملائية
                const fixedGoogleTexts = googleTexts.map(t => fixGoogleSpelling(t));
                result = restoreValues(protected_text, fixedGoogleTexts);
            } else {
                result = restoreValues(protected_text, dictResults);
                if (mode === 'google') msg('⚠️ Google غير متاح - تم استخدام القاموس', 'warning');
            }
        }
        tt.value = result; msg('✅ تمت الترجمة!', 'success');
    } catch (e) { msg('❌ خطأ', 'error'); }
}

// ==================== أزرار ====================
window.translateDict = () => dt('dict');
window.translateGoogle = () => dt('google');
window.translateHybrid = () => dt('hybrid');
window.copyText = () => { const t = document.getElementById('translatedText').value; if (t) navigator.clipboard.writeText(t).then(() => msg('📋 تم النسخ!', 'success')); };
window.downloadText = () => { const t = document.getElementById('translatedText').value; if (!t) return; const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['\uFEFF' + t])); a.download = fileName ? 'translated_' + fileName : 'legendary_translation.txt'; a.click(); };
window.clearAll = () => { document.getElementById('sourceText').value = ''; document.getElementById('translatedText').value = ''; fileContent = null; fileName = null; msg('🗑️ تم المسح'); };

// ==================== تدوين - عكس النصوص العربية فقط ====================
window.reverseText = () => {
    const ta = document.getElementById('translatedText');
    if (!ta?.value) { msg('⚠️ لا يوجد نص', 'warning'); return; }
    let text = ta.value;
    text = text.replace(/"([^"]*)"/g, (full, value) => /[\u0600-\u06FF]/.test(value) ? '"' + value.split('').reverse().join('') + '"' : full);
    text = text.replace(/=\s*(.*)/g, (full, value) => /[\u0600-\u06FF]/.test(value) ? '= ' + value.split('').reverse().join('') : full);
    text = text.replace(/>([^<]*)</g, (full, value) => /[\u0600-\u06FF]/.test(value) ? '>' + value.split('').reverse().join('') + '<' : full);
    text = text.split('\n').map(line => /[\u0600-\u06FF]/.test(line) && !/[<>"=]/.test(line) ? line.split('').reverse().join('') : line).join('\n');
    ta.value = text;
    msg('🔄 تم عكس النصوص العربية فقط!', 'success');
};

// ==================== تصحيح كلمة للقاموس ====================
window.fixWord = () => {
    const en = document.getElementById('fixEnglish').value.trim().toLowerCase();
    const ar = document.getElementById('fixArabic').value.trim();
    if (!en || !ar) { msg('⚠️ املأ الحقلين', 'warning'); return; }
    DICT.set(en, ar); saveFixes();
    document.getElementById('fixEnglish').value = ''; document.getElementById('fixArabic').value = '';
    document.getElementById('fixStatus').textContent = '✅ تم: ' + en + ' → ' + ar;
    msg('✅ تم التصحيح!', 'success');
};

// ==================== تصحيح خطأ Google إملائي ====================
window.fixGoogleError = () => {
    const wrong = document.getElementById('fixGoogleWrong').value.trim();
    const correct = document.getElementById('fixGoogleCorrect').value.trim();
    if (!wrong || !correct) { msg('⚠️ املأ الحقلين', 'warning'); return; }
    GOOGLE_FIXES.set(wrong, correct);
    document.getElementById('fixGoogleWrong').value = ''; document.getElementById('fixGoogleCorrect').value = '';
    document.getElementById('fixGoogleStatus').textContent = '✅ تم: ' + wrong + ' → ' + correct;
    msg('✅ تم تصحيح خطأ Google!', 'success');
};

window.addBatch = () => {
    const text = document.getElementById('batchInput').value.trim();
    if (!text) { msg('⚠️ أدخل جمل', 'warning'); return; }
    let n = 0; text.split('\n').forEach(l => { const p = l.trim().split(/\s*=\s*/); if (p.length >= 2 && p[0] && p[1]) { DICT.set(p[0].toLowerCase().trim(), p[1].trim()); n++; } });
    saveFixes(); document.getElementById('batchStatus').textContent = '✅ تم: ' + n + ' جملة'; msg('✅ تمت الإضافة!', 'success');
};

// ==================== رفع ملفات ====================
const zone = document.getElementById('uploadZone'), input = document.getElementById('fileInput');
if (zone && input) { zone.onclick = () => input.click(); zone.ondragover = e => { e.preventDefault(); }; zone.ondrop = e => { e.preventDefault(); if (e.dataTransfer.files[0]) rf(e.dataTransfer.files[0]); }; input.onchange = e => { if (e.target.files[0]) rf(e.target.files[0]); }; }
function rf(f) { if (f.size > 500 * 1024 * 1024) { msg('⚠️ حجم كبير!', 'error'); return; } fileName = f.name; const r = new FileReader(); r.onload = e => { fileContent = e.target.result; document.getElementById('sourceText').value = fileContent.substring(0, 5000); msg('📁 تم الرفع!', 'success'); }; r.readAsText(f, 'UTF-8'); }
function ip() { const c = document.getElementById('particles'); if (!c) return; const cols = ['#ff6600', '#ffaa00', '#ffcc00', '#8a2be2', '#00b4d8', '#ff3366']; for (let i = 0; i < 50; i++) { const p = document.createElement('div'); p.className = 'particle'; const s = Math.random() * 6 + 2; p.style.cssText = 'left:' + Math.random() * 100 + '%;top:' + Math.random() * 100 + '%;width:' + s + 'px;height:' + s + 'px;background:' + cols[Math.floor(Math.random() * cols.length)] + ';animation-duration:' + (Math.random() * 6 + 4) + 's'; c.appendChild(p); } }

// ==================== بدء ====================
buildFullDict(); loadFixes(); ip();
console.log('🐉 المترجم الأسطوري جاهز!');
console.log('📚 ' + DICT.size.toLocaleString() + ' كلمة وجملة في القاموس');
console.log('✅ تصحيح أخطاء Google الإملائية مفعل');
console.log('✅ التدوين يعكس النصوص العربية فقط');
console.log('👑 King of Dragons | TGB 🎮');