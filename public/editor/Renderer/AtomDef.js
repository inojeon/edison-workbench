/**
 * @file 원소의 정보를 정의한 클래스
 * @version 0.1
 */
export var AtomDef = {};

AtomDef._atomDefList = [];
AtomDef._atomNumList = [];

/**
 * index에 해당하는 원자 정보를 반환한다
 * @param {Number} index 원자 인덱스
 */
AtomDef.GetDefWithNumber = function (index) {
    return AtomDef._atomNumList[index];
}

/**
 * id에 해당하는 원자 정보를 반환한다
 * @param {String} id 원자 아이디
 */
AtomDef.GetDefWithID = function (id) {
    return AtomDef._atomDefList[id.toUpperCase()];
}


/**
 * 한 원소의 특성을 정의한 클래스다. 이름, 반지름, 질량 등이 정의된다.
 * */
export class CAtomDef {

    /**
     * 원소를 정의한다
     * @param {any} number 원소 번호
     * @param {any} atom 원소 기호
     * @param {any} kname 원소 이름 (한글)
     * @param {any} name 원소 이름 (영문)
     * @param {any} r 컬러 R
     * @param {any} g 컬러 G
     * @param {any} b 컬러 B
     * @param {any} radius 반지름
     * @param {any} metal 메탈
     * @param {any} group 그룹
     * @param {any} period 주기율
     */
    constructor(number, atom, kname, name, r, g, b, radius, metal, group, period) {

        /// AtomDef의 ID이다. string
        this._id = atom.toUpperCase();

        /// 원소의 이름. string
        this._atom_id = atom;

        /// 원소의 반지름. 
        this._radius = (radius + 100) / 500 * 1.;
        this._empirical_radius = radius;

        /// 원소의 이름. 영문
        this._name = name;

        /// 원소의 이름. 한글
        this._korean_name = kname;

        /// 원소의 컬러
        this._color = [0, 0, 0];

        /// 원소의 디퓨즈 컬러
        this._diffuseColor = [0, 0, 0];

        /// 원소의 emissive 컬러
        this._emissiveColor = [0, 0, 0];

        /// 원소의 specular 컬러
        this._specularColor = [1, 1, 1];

        this.setColor(r / 255, g / 255, b / 255);
        this.setDefaultColor(r / 255, g / 255, b / 255);

        /// 원소의 Ambient 컬러
        this._ambientColor = [0.0, 0.0, 0.0];

        /// 원소의 specular power
        this._specularPower = 15;

        /// 원소의 원자수
        this._atom_number = number;

        /// 메탈
        this._metal = metal;

        /// 원소의 주기
        this._period = period;

        /// 원소의 그룹
        this._group = group;

        /// 가질 수 있는 본드의 수
        this._vsepr_type = 0;

        /// lone pair 의 수
        this._vsepr_lpair = 0;

        /// 원소 결합시 각도
        this._vsepr_angle = 0;

        /// 원소 크기
        this._atom_vis_size = 1;

        /// 원소 가시화 여부
        this._visible = true;
    }

    /**
     * 색상을 정의한다
     * @param {any} r red
     * @param {any} g green
     * @param {any} b blue
     */
    setColor(r, g, b) {
        this._color = [r, g, b];

        this._diffuseColor = [r, g, b];
        this._emissiveColor = [r * 0.1, g * 0.1, b * 0.1];

        this._specularColor = [1, 1, 1];
    };


    /**
     * 기본 컬러를 정의한다
     * @param {Number} r red
     * @param {Number} g green
     * @param {Number} b blue
     */
    setDefaultColor(r, g, b) {
        this._defColor = [r, g, b];
    };

    
    /**
     * 기본 원소 문자 크기를 정의한다
     * @param {Number} size 크기
     */
    setNameSize(size) {
        this._atom_vis_size = size;
    };

};


/**
 * 원소의 VSEPR 값을 정의
 * @param {String} atom 원소 기호
 * @param {String} type 타입
 * @param {Function} lone_pair long pair
 * @param {Function} angle 각도
 */
function setAtomVSEPR(atom, type, lone_pair, angle) {
    var atom_def = AtomDef._atomDefList[atom.toUpperCase()];
    if (!atom_def)
        return;

    atom_def._vsepr_type = type;
    atom_def._vsepr_lpair = lone_pair;
    atom_def._vsepr_angle = angle;
}

/**
 * 원소의 메탈 값을 정의
 * @param {String} atom 원소
 * @param {Number} metal 메탈 값
 */
function setAtomMetal(atom, metal) {
    var atom_def = AtomDef._atomDefList[atom.toUpperCase()];
    if (!atom_def)
        return;

    atom_def._metal = metal;
}

/**
* 원소의 Isotope 값을 설정
* @param {String} isotope 원소의 isotope
* @param {String} atom
*/
function addIsotope(isotope, atom) {
}

/**
 * 원소의 정보를 정의한다
 * @param {Number} number
 * @param {String} atom
 * @param {String} kname
 * @param {String} name
 * @param {Number} r
 * @param {Number} g
 * @param {Number} b
 * @param {Number} radius
 * @param {Number} metal
 * @param {String} group
 * @param {Number} period
 */
function setAtomData(number, atom, kname, name, r, g, b, radius, metal, group, period) {
    var atom_def = new CAtomDef(number, atom, kname, name, r, g, b, radius, metal, group, period);

    AtomDef._atomDefList[atom.toUpperCase()] = atom_def;
    AtomDef._atomNumList[number] = atom_def;
}



///////////////////
// setAtomData
///////////////////

setAtomData(1, "H", "수소", "Hydrogen", 255, 255, 255, 25, 0, 1, 1);
setAtomData(2, "He", "헬륨", "Helium", 217, 255, 255, 120, 0, 18, 1);
setAtomData(3, "Li", "리튬", "Lithium", 204, 128, 255, 145, 0, 1, 2);
setAtomData(4, "Be", "베릴륨", "Beryllium", 194, 255, 0, 105, 0, 2, 2);
setAtomData(5, "B", "붕소", "Boron", 255, 181, 181, 85, 0, 13, 2);
setAtomData(6, "C", "탄소", "Carbon", 54, 54, 54, 70, 0, 14, 2);
setAtomData(7, "N", "질소", "Nitrogen", 48, 80, 248, 65, 0, 15, 2);
setAtomData(8, "O", "산소", "Oxygen", 255, 13, 13, 60, 0, 16, 2);
setAtomData(9, "F", "플루오린", "Fluorine", 144, 224, 80, 50, 0, 17, 2);
setAtomData(10, "Ne", "네온", "Neon", 179, 227, 245, 160, 0, 18, 2);
setAtomData(11, "Na", "나트륨", "Sodium", 171, 92, 242, 180, 0, 1, 3);
setAtomData(12, "Mg", "마그네슘", "Magnesium", 138, 255, 0, 150, 0, 2, 3);
setAtomData(13, "Al", "알루미늄", "Aluminium", 191, 166, 166, 125, 0, 13, 3);
setAtomData(14, "Si", "규소", "Silicon", 240, 200, 160, 110, 0, 14, 3);
setAtomData(15, "P", "인", "Phosphorus", 255, 128, 0, 100, 0, 15, 3);
setAtomData(16, "S", "황", "Sulfur", 255, 255, 48, 100, 0, 16, 3);
setAtomData(17, "Cl", "염소", "Chlorine", 31, 240, 31, 100, 0, 17, 3);
setAtomData(18, "Ar", "아르곤", "Argon", 128, 209, 227, 71, 0, 18, 3);
setAtomData(19, "K", "칼륨", "Potassium", 143, 64, 212, 220, 0, 1, 4);
setAtomData(20, "Ca", "칼슘", "Calcium", 61, 255, 0, 180, 0, 2, 4);
setAtomData(21, "Sc", "스칸듐", "Scandium", 230, 230, 230, 160, 0, 3, 4);
setAtomData(22, "Ti", "티타늄", "Titanium", 191, 194, 199, 140, 0, 4, 4);
setAtomData(23, "V", "바나듐", "Vanadium", 166, 166, 171, 135, 0, 5, 4);
setAtomData(24, "Cr", "크롬", "Chromium", 138, 153, 199, 140, 0, 6, 4);
setAtomData(25, "Mn", "망가니즈", "Manganese", 156, 122, 199, 140, 0, 7, 4);
setAtomData(26, "Fe", "철", "Iron", 224, 102, 51, 140, 0, 8, 4);
setAtomData(27, "Co", "코발트", "Cobalt", 240, 144, 160, 135, 0, 9, 4);
setAtomData(28, "Ni", "니켈", "Nickel", 80, 208, 80, 135, 0, 10, 4);
setAtomData(29, "Cu", "구리", "Copper", 200, 128, 51, 135, 0, 11, 4);
setAtomData(30, "Zn", "아연", "Zinc", 125, 128, 176, 135, 0, 12, 4);
setAtomData(31, "Ga", "갈륨", "Gallium", 194, 143, 143, 130, 0, 13, 4);
setAtomData(32, "Ge", "게르마늄", "Germanium", 102, 143, 143, 125, 0, 14, 4);
setAtomData(33, "As", "비소", "Arsenic", 189, 128, 227, 115, 0, 15, 4);
setAtomData(34, "Se", "셀레늄", "Selenium", 255, 161, 0, 115, 0, 16, 4);
setAtomData(35, "Br", "브로민", "Bromine", 166, 41, 41, 115, 0, 17, 4);
setAtomData(36, "Kr", "크립톤", "Krypton", 92, 184, 209, 115, 0, 18, 4);
setAtomData(37, "Rb", "루비듐", "Rubidium", 112, 46, 176, 235, 0, 1, 5);
setAtomData(38, "Sr", "스트론튬", "Strontium", 0, 255, 0, 200, 0, 2, 5);
setAtomData(39, "Y", "이트륨", "Yttrium", 148, 255, 255, 180, 0, 3, 5);
setAtomData(40, "Zr", "지르코늄", "Zirconium", 148, 224, 224, 155, 0, 4, 5);
setAtomData(41, "Nb", "나이오븀", "Niobium", 115, 194, 201, 145, 0, 5, 5);
setAtomData(42, "Mo", "몰리브데넘", "Molybdenum", 84, 181, 181, 145, 0, 6, 5);
setAtomData(43, "Tc", "테크네튬", "Technetium", 59, 158, 158, 135, 0, 7, 5);
setAtomData(44, "Ru", "루테늄", "Ruthenium", 36, 143, 143, 130, 0, 8, 5);
setAtomData(45, "Rh", "로듐", "Rhodium", 10, 125, 140, 135, 0, 9, 5);
setAtomData(46, "Pd", "팔라듐", "Palladium", 0, 105, 133, 140, 0, 10, 5);
setAtomData(47, "Ag", "은", "Silver", 192, 192, 192, 160, 0, 11, 5);
setAtomData(48, "Cd", "카드뮴", "Cadmium", 255, 217, 143, 155, 0, 12, 5);
setAtomData(49, "In", "인듐", "Indium", 166, 117, 115, 155, 0, 13, 5);
setAtomData(50, "Sn", "주석", "Tin", 102, 128, 128, 145, 0, 14, 5);
setAtomData(51, "Sb", "안티모니", "Antimony", 158, 99, 181, 145, 0, 15, 5);
setAtomData(52, "Te", "텔루륨", "Tellurium", 212, 122, 0, 140, 0, 16, 5);
setAtomData(53, "I", "아이오딘", "Iodine", 148, 0, 148, 140, 0, 17, 5);
setAtomData(54, "Xe", "제논", "Xenon", 66, 158, 176, 140, 0, 18, 5);
setAtomData(55, "Cs", "세슘", "Caesium", 87, 23, 143, 260, 0, 1, 6);
setAtomData(56, "Ba", "바륨", "Barium", 0, 201, 0, 215, 0, 2, 6);

// Lantan Group - Period/Group Modified for Table.
setAtomData(57, "La", "란타넘", "Lanthanum", 112, 212, 255, 195, 0, 3, 8);
setAtomData(58, "Ce", "세륨", "Cerium", 255, 255, 199, 185, 0, 4, 8);
setAtomData(59, "Pr", "프라세오디뮴", "Praseodymium", 217, 255, 199, 185, 0, 5, 8);
setAtomData(60, "Nd", "네오디뮴", "Neodymium", 199, 255, 199, 185, 0, 6, 8);
setAtomData(61, "Pm", "프로메튬", "Promethium", 163, 255, 199, 185, 0, 7, 8);
setAtomData(62, "Sm", "사마륨", "Samarium", 143, 255, 199, 185, 0, 8, 8);
setAtomData(63, "Eu", "유로퓸", "Europium", 97, 255, 199, 185, 0, 9, 8);
setAtomData(64, "Gd", "가돌리늄", "Gadolinium", 69, 255, 199, 180, 0, 10, 8);
setAtomData(65, "Tb", "터븀", "Terbium", 48, 255, 199, 175, 0, 11, 8);
setAtomData(66, "Dy", "디스프로슘", "Dysprosium", 31, 255, 199, 175, 0, 12, 8);
setAtomData(67, "Ho", "홀뮴", "Holmium", 0, 255, 156, 175, 0, 13, 8);
setAtomData(68, "Er", "어븀", "Erbium", 0, 230, 117, 175, 0, 14, 8);
setAtomData(69, "Tm", "툴륨", "Thulium", 0, 212, 82, 175, 0, 15, 8);
setAtomData(70, "Yb", "이터븀", "Ytterbium", 0, 191, 56, 175, 0, 16, 8);
setAtomData(71, "Lu", "루테튬", "Lutetium", 0, 171, 36, 175, 0, 17, 8);
// end of Lantan Group

setAtomData(72, "Hf", "하프늄", "Hafnium", 77, 194, 255, 155, 0, 4, 6);
setAtomData(73, "Ta", "탄탈럼", "Tantalum", 77, 166, 255, 145, 0, 5, 6);
setAtomData(74, "W", "텅스텐", "Tungsten", 33, 148, 214, 135, 0, 6, 6);
setAtomData(75, "Re", "레늄", "Rhenium", 38, 125, 171, 135, 0, 7, 6);
setAtomData(76, "Os", "오스뮴", "Osmium", 38, 102, 150, 130, 0, 8, 6);
setAtomData(77, "Ir", "이리듐", "Iridium", 23, 84, 135, 135, 0, 9, 6);
setAtomData(78, "Pt", "백금", "Platinum", 208, 208, 224, 135, 0, 10, 6);
setAtomData(79, "Au", "금", "Gold", 255, 209, 35, 135, 0, 11, 6);
setAtomData(80, "Hg", "수은", "Mercury", 184, 184, 208, 150, 0, 12, 6);
setAtomData(81, "Tl", "탈륨", "Thallium", 166, 84, 77, 190, 0, 13, 6);
setAtomData(82, "Pb", "납", "Lead", 87, 89, 97, 180, 0, 14, 6);
setAtomData(83, "Bi", "비스무트", "Bismuth", 158, 79, 181, 160, 0, 15, 6);
setAtomData(84, "Po", "폴로늄", "Polonium", 171, 92, 0, 190, 0, 16, 6);
setAtomData(85, "At", "아스타틴", "Astatine", 117, 79, 69, 190, 0, 17, 6);
setAtomData(86, "Rn", "라돈", "Radon", 66, 130, 150, 190, 0, 18, 6);
setAtomData(87, "Fr", "프랑슘", "Francium", 66, 0, 102, 190, 0, 1, 7);
setAtomData(88, "Ra", "라듐", "Radium", 0, 125, 0, 215, 0, 2, 7);

// Actin Group - Period/Group Modified for Table.
setAtomData(89, "Ac", "악티늄", "Actinium", 112, 171, 250, 195, 0, 3, 9);
setAtomData(90, "Th", "토륨", "Thorium", 0, 186, 255, 180, 0, 4, 9);
setAtomData(91, "Pa", "프로트악티늄", "Protactinium", 0, 161, 255, 180, 0, 5, 9);
setAtomData(92, "U", "우라늄", "Uranium", 0, 143, 255, 175, 0, 6, 9);
setAtomData(93, "Np", "넵투늄", "Neptunium", 0, 128, 255, 175, 0, 7, 9);
setAtomData(94, "Pu", "플루토늄", "Plutonium", 0, 107, 255, 175, 0, 8, 9);
setAtomData(95, "Am", "아메리슘", "Americium", 84, 92, 242, 175, 0, 9, 9);
setAtomData(96, "Cm", "퀴륨", "Curium", 120, 92, 227, 175, 0, 10, 9);
setAtomData(97, "Bk", "버클륨", "Berkelium", 138, 79, 227, 175, 0, 11, 9);
setAtomData(98, "Cf", "캘리포늄", "Californium", 161, 54, 212, 175, 0, 12, 9);
setAtomData(99, "Es", "아인슈타이늄", "Einsteinium", 179, 31, 212, 175, 0, 13, 9);
setAtomData(100, "Fm", "페르뮴", "Fermium", 179, 31, 186, 175, 0, 14, 9);
setAtomData(101, "Md", "멘델레븀", "Mendelevium", 179, 13, 166, 175, 0, 15, 9);
setAtomData(102, "No", "노벨륨", "Nobelium", 189, 13, 135, 175, 0, 16, 9);
setAtomData(103, "Lr", "로렌슘", "Lawrencium", 199, 0, 102, 175, 0, 17, 9);
// end of Actin Group

setAtomData(104, "Rf", "러더포듐", "Rutherfordium", 204, 0, 89, 175, 0, 4, 7);
setAtomData(105, "Db", "더브늄", "Dubnium", 209, 0, 79, 175, 0, 5, 7);
setAtomData(106, "Sg", "시보귬", "Seaborgium", 217, 0, 69, 175, 0, 6, 7);
setAtomData(107, "Bh", "보륨", "Bohrium", 224, 0, 56, 175, 0, 7, 7);
setAtomData(108, "Hs", "하슘", "Hassium", 230, 0, 46, 175, 0, 8, 7);
setAtomData(109, "Mt", "마이트너륨", "Meitnerium", 235, 0, 38, 175, 0, 9, 7);
setAtomData(110, "Ds", "다름슈타튬", "Darmstadtium", 128, 128, 128, 175, 0, 10, 7);
setAtomData(111, "Rg", "뢴트게늄", "Roentgenium", 128, 128, 128, 175, 0, 11, 7);
setAtomData(112, "Cn", "코페르니슘", "Copernicium", 128, 128, 128, 175, 0, 12, 7);
setAtomData(113, "Nh", "니호늄", "Nihonium", 128, 128, 128, 175, 0, 13, 7);
setAtomData(114, "Fl", "플레로븀", "Flerovium", 128, 128, 128, 175, 0, 14, 7);
setAtomData(115, "Mc", "모스코븀", "Moscovium", 128, 128, 128, 175, 0, 15, 7);
setAtomData(116, "Lv", "리버모륨", "Livermorium", 128, 128, 128, 175, 0, 16, 7);
setAtomData(117, "Ts", "테네신", "Tennessine", 128, 128, 128, 175, 0, 17, 7);
setAtomData(118, "Og", "오가네손", "Oganesson", 128, 128, 128, 175, 0, 18, 7);

setAtomData(199, "?", "미정", "?", 28, 28, 28, 100, 0, 0, 0);
setAtomData(200, "@", "@Anchor", "Anchor", 256, 0, 0, 10, 0, 0, 0);
setAtomData(201, "#", "#Upvector", "Upvector", 0, 0, 255, 10, 0, 0, 0);

setAtomData(211, "+1", "+1", "+1", 255, 255, 255, 10, 7, 0, 0);
setAtomData(212, "+2", "+1", "+1", 255, 255, 255, 10, 7, 0, 0);
setAtomData(213, "+3", "+1", "+1", 255, 255, 255, 10, 7, 0, 0);
setAtomData(214, "+4", "+1", "+1", 255, 255, 255, 10, 7, 0, 0);
setAtomData(215, "+5", "+1", "+1", 255, 255, 255, 10, 7, 0, 0);
setAtomData(216, "+6", "+1", "+1", 255, 255, 255, 10, 7, 0, 0);
setAtomData(217, "+7", "+1", "+1", 255, 255, 255, 10, 7, 0, 0);
setAtomData(218, "+8", "+1", "+1", 255, 255, 255, 10, 7, 0, 0);
setAtomData(219, "+9", "+1", "+1", 255, 255, 255, 10, 7, 0, 0);

setAtomData(221, "-1", "+1", "+1", 255, 255, 255, 10, 7, 0, 0);
setAtomData(222, "-2", "+1", "+1", 255, 255, 255, 10, 7, 0, 0);
setAtomData(223, "-3", "+1", "+1", 255, 255, 255, 10, 7, 0, 0);
setAtomData(224, "-4", "+1", "+1", 255, 255, 255, 10, 7, 0, 0);
setAtomData(225, "-5", "+1", "+1", 255, 255, 255, 10, 7, 0, 0);
setAtomData(226, "-6", "+1", "+1", 255, 255, 255, 10, 7, 0, 0);
setAtomData(227, "-7", "+1", "+1", 255, 255, 255, 10, 7, 0, 0);
setAtomData(228, "-8", "+1", "+1", 255, 255, 255, 10, 7, 0, 0);
setAtomData(229, "-9", "+1", "+1", 255, 255, 255, 10, 7, 0, 0);


// 0 : 비금속
// 1 : 알카리 금속
// 2 : 알카리 포금속
// 3 : 전이 금속
// 4 : 전이 후 금속
// 5 : 준금속
// 6 : 비활성 기체

setAtomMetal("He", 6);
setAtomMetal("Ne", 6);
setAtomMetal("Ar", 6);
setAtomMetal("Kr", 6);
setAtomMetal("Xe", 6);
setAtomMetal("Rn", 6);

setAtomMetal("B", 5);
setAtomMetal("Si", 5);
setAtomMetal("Ge", 5);
setAtomMetal("As", 5);
setAtomMetal("Sb", 5);
setAtomMetal("Te", 5);
setAtomMetal("At", 5);

setAtomMetal("Li", 1);
setAtomMetal("Na", 1);
setAtomMetal("K", 1);
setAtomMetal("Rb", 1);
setAtomMetal("Cs", 1);
setAtomMetal("Fr", 1);
setAtomMetal("Uue", 1);
setAtomMetal("Be", 2);
setAtomMetal("Mg", 2);
setAtomMetal("Ca", 2);
setAtomMetal("Sr", 2);
setAtomMetal("Ba", 2);
setAtomMetal("Ra", 2);
setAtomMetal("Sc", 3);
setAtomMetal("Ti", 3);
setAtomMetal("V", 3);
setAtomMetal("Cr", 3);
setAtomMetal("Mn", 3);
setAtomMetal("Fe", 3);
setAtomMetal("Co", 3);
setAtomMetal("Ni", 3);
setAtomMetal("Cu", 3);
setAtomMetal("Zn", 3);
setAtomMetal("Y", 3);
setAtomMetal("Zr", 3);
setAtomMetal("Nb", 3);
setAtomMetal("Mo", 3);
setAtomMetal("Tc", 3);
setAtomMetal("Ru", 3);
setAtomMetal("Rh", 3);
setAtomMetal("Pd", 3);
setAtomMetal("Ag", 3);
setAtomMetal("Cd", 3);
setAtomMetal("Rf", 3);
setAtomMetal("Db", 3);
setAtomMetal("Sg", 3);
setAtomMetal("Bh", 3);
setAtomMetal("Hs", 3);
setAtomMetal("Cn", 3);
setAtomMetal("Hf", 3);
setAtomMetal("Ta", 3);
setAtomMetal("W", 3);
setAtomMetal("Re", 3);
setAtomMetal("Os", 3);
setAtomMetal("Ir", 3);
setAtomMetal("Pt", 3);
setAtomMetal("Au", 3);
setAtomMetal("Hg", 3);
setAtomMetal("Al", 4);
setAtomMetal("Ga", 4);
setAtomMetal("In", 4);
setAtomMetal("Sn", 4);
setAtomMetal("Tl", 4);
setAtomMetal("Pb", 4);
setAtomMetal("Bi", 4);
setAtomMetal("Po", 4);



setAtomVSEPR("C", 4, 0, 109.5);
setAtomVSEPR("Ge", 4, 0, 109.5);
setAtomVSEPR("N", 4, 1, 109.5);
setAtomVSEPR("P", 4, 1, 109.5);

setAtomVSEPR("O", 4, 2, 109.5);
setAtomVSEPR("S", 4, 2, 109.5);
setAtomVSEPR("Se", 4, 2, 109.5);
setAtomVSEPR("Te", 4, 2, 109.5);
setAtomVSEPR("Po", 4, 2, 109.5);

setAtomVSEPR("B", 3, 0, 120);
setAtomVSEPR("Al", 3, 0, 120);
setAtomVSEPR("Ga", 3, 0, 120);

setAtomVSEPR("As", 1, 0, 0);
setAtomVSEPR("F", 1, 0, 0);
setAtomVSEPR("Cl", 1, 0, 0);
setAtomVSEPR("Br", 1, 0, 0);
setAtomVSEPR("I", 1, 0, 0);
setAtomVSEPR("At", 1, 0, 0);

setAtomVSEPR("Li", 1, 0, 0);
setAtomVSEPR("Na", 1, 0, 0);
setAtomVSEPR("K", 1, 0, 0);
setAtomVSEPR("Rb", 1, 0, 0);
setAtomVSEPR("Cs", 1, 0, 0);
setAtomVSEPR("Fr", 1, 0, 0);

setAtomVSEPR("Be", 2, 0, 180);
setAtomVSEPR("Mg", 2, 0, 180);
setAtomVSEPR("Ca", 2, 0, 180);
setAtomVSEPR("Sr", 2, 0, 180);
setAtomVSEPR("Ba", 2, 0, 180);
setAtomVSEPR("Ra", 2, 0, 180);



