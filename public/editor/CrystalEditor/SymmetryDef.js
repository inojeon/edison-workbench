export var SystemDef = {};
export var SpaceGroupDef = {};
export var SettingDef = {};

SystemDef._defList = [];
SystemDef._numList = [];

SpaceGroupDef._defList = [];
SpaceGroupDef._numList = [];

SettingDef._defOnList = [];
SettingDef._numOnList = [];
SettingDef._defOffList = [];
SettingDef._numOffList = [];

/**
 * key에 맞는 SystemDef를 반환한다.
 * @param {String} key SystemDef key
 */
SystemDef.GetDataWithKey = function (key) {
    return SystemDef._defList[key];
}

/**
 * id에 맞는 SystemDef를 반환한다.
 * @param {Number} id SystemDef id
 */
SystemDef.GetDataWithID = function (id) {
    return SystemDef._numList[id];
}

/**
 * key에 맞는 SpaceGroupDef를 반환한다.
 * @param {String} key SpaceGroupDef key
 */
SpaceGroupDef.GetDataWithKey = function (key) {
    return SpaceGroupDef._defList[key];
}

/**
 * id에 맞는 SpaceGroupDef를 반환한다.
 * @param {Number} id SpaceGroupDef id
 */
SpaceGroupDef.GetDataWithID = function (id) {
    return SpaceGroupDef._numList[id];
}

/**
 * key, mode에 따라 SettingDef를 반환한다.
 * @param {String} key SettingDef key
 * @param {Boolean} mode SettingDef mode
 */
SettingDef.GetDataWithKey = function (key, mode) {
    if (mode)
        return SettingDef._defOnList[key];
    else
        return SettingDef._defOffList[key];
}

/**
 * id, mode에 따라 SettingDef를 반환한다.
 * @param {Number} id SettingDef id
 * @param {Boolean} mode SettingDef mode
 */
SettingDef.GetDataWithID = function (id, mode) {
    if (mode)
        return SettingDef._numOnList[id];
    else
        return SettingDef._numOffList[idx];
}

/**
 * SystemDef 클래스
 * */
export class CSystemDef {

    /**
     * 생성자
     * */
    constructor() {
        this._name = "";
        this._range = [];
    }

    /**
     * 이름을 지정한다.
     * @param {String} name 지정할 이름
     */
    setName(name) {
        this._name = name;
    }

    /**
     * 포함하는 space group의 범위를 설정한다.
     * @param {Number} start space group 시작 인덱스
     * @param {Number} end space group 종료 인덱스
     */
    setRange(start, end) {
        this._range = [start, end];
    }

    /**
     * lattice field 입력창의 enable disable을 설정한다.
     * @param {Array} enableLattice lattice 입력창 설정
     */
    setEnableLattice(enableLattice) {
        this._enableLattice = enableLattice;
    }
}

/**
 * SpaceGroupDef 클래스
 * */
export class CSpaceGroupDef {

    /**
     * 생성자
     * */
    constructor() {
        this._name = "";
        this._spaceGroupName = "";
    }

    /**
     * 이름을 지정한다.
     * @param {String} name 지정할 이름
     */
    setName(name) {
        this._name = name;
    }

    setIdx(idx) {
        this._idx = idx;
    }
}

/**
 * SettingDef 클래스
 * */
export class CSettingDef {

    /**
     * 생성자
     * */
    constructor() {
        this._name = "";
        this._lattice = null;
        this._mode = false;
    }

    /**
     * 이름을 지정한다.
     * @param {String} name 지정할 이름
     */
    setName(name) {
        this._name = name;
    }

    /**
     * spacegroup의 이름을 지정한다.
     * @param {String} spaceGroupName space group 명
     */
    setSpaceGroupName(spaceGroupName) {
        this._spaceGroupName = spaceGroupName;
    }


    setIdx(idx) {
        this._idx = idx;
    }
    /**
     * lattice field 입력창의 enable disable을 설정한다.
     * @param {Array} lattice lattice 입력창 설정
     */
    setLattice(lattice) {
        this._lattice = lattice;
    }

    /**
     * 모드를 설정한다.
     * @param {Boolean} mode
     */
    setMode(mode) {
        this._mode = mode;
    }

    setEnableLattice(enableLattice) {
        this._enableLattice = enableLattice;
    }
}

/**
 * lattice 입력란 활성화 여부를 설정하는 클래스
 * */
export class CEnableLatticeDef {

    /**
     * 생성자
     * @param {Boolean} a a입력란 활성화
     * @param {Boolean} b b입력란 활성화
     * @param {Boolean} c c입력란 활성화
     * @param {Boolean} alpha alpha입력란 활성화
     * @param {Boolean} beta beta입력란 활성화
     * @param {Boolean} gamma gamma입력란 활성화
     * @param {Boolean} su_a su_a입력란 활성화
     * @param {Boolean} su_b su_b입력란 활성화
     * @param {Boolean} su_c su_c입력란 활성화
     * @param {Boolean} su_alpha su_alpha입력란 활성화
     * @param {Boolean} su_beta su_beta입력란 활성화
     * @param {Boolean} su_gamma su_gamma입력란 활성화
     */
    constructor(a, b, c, alpha, beta, gamma, su_a, su_b, su_c, su_alpha, su_beta, su_gamma) {
        this._enableA = a;
        this._enableB = b;
        this._enableC = c;

        this._enableAlpha = alpha;
        this._enableBeta = beta;
        this._enableGamma = gamma;

        this._enableSuA = su_a;
        this._enableSuB = su_b;
        this._enableSuC = su_c;

        this._enableSuAlpha = su_alpha;
        this._enableSuBeta = su_beta;
        this._enableSuGamma = su_gamma;
    }

    /**
     * enable 설정
     * @param {Boolean} a a입력란 활성화
     * @param {Boolean} b b입력란 활성화
     * @param {Boolean} c c입력란 활성화
     * @param {Boolean} alpha alpha입력란 활성화
     * @param {Boolean} beta beta입력란 활성화
     * @param {Boolean} gamma gamma입력란 활성화
     * @param {Boolean} su_a su_a입력란 활성화
     * @param {Boolean} su_b su_b입력란 활성화
     * @param {Boolean} su_c su_c입력란 활성화
     * @param {Boolean} su_alpha su_alpha입력란 활성화
     * @param {Boolean} su_beta su_beta입력란 활성화
     * @param {Boolean} su_gamma su_gamma입력란 활성화
     */
    SetEnable(a, b, c, alpha, beta, gamma, su_a, su_b, su_c, su_alpha, su_beta, su_gamma) {
        this._enableA = a;
        this._enableB = b;
        this._enableC = c;

        this._enableAlpha = alpha;
        this._enableBeta = beta;
        this._enableGamma = gamma;

        this._enableSuA = su_a;
        this._enableSuB = su_b;
        this._enableSuC = su_c;

        this._enableSuAlpha = su_alpha;
        this._enableSuBeta = su_beta;
        this._enableSuGamma = su_gamma;
    }
}
/**
 * lattice 입력값 세팅 클래스
 * */
export class CLatticeDef {

    /**
     * 생성자
     * @param {Number} a a 입력값
     * @param {Number} b b 입력값
     * @param {Number} c  c 입력값
     * @param {Number} alpha alpha 입력값
     * @param {Number} beta beta 입력값
     * @param {Number} gamma gamma 입력값
     * @param {Number} su_a su a 입력값
     * @param {Number} su_b su b 입력값
     * @param {Number} su_c su c 입력값
     * @param {Number} su_alpha su alpha 입력값
     * @param {Number} su_beta su beta 입력값
     * @param {Number} su_gamma su gamma 입력값
     */
    constructor(a, b, c, alpha, beta, gamma, su_a, su_b, su_c, su_alpha, su_beta, su_gamma) {
        this._a = a;
        this._b = b;
        this._c = c;

        this._alpha = alpha;
        this._beta = beta;
        this._gamma = gamma;

        this._su_a = su_a;
        this._su_b = su_b;
        this._su_c = su_c;

        this._su_alpha = su_alpha;
        this._su_beta = su_beta;
        this._su_gamma = su_gamma;
    }

    /**
     * 값 설정
     * @param {Number} a a 입력값
     * @param {Number} b b 입력값
     * @param {Number} c  c 입력값
     * @param {Number} alpha alpha 입력값
     * @param {Number} beta beta 입력값
     * @param {Number} gamma gamma 입력값
     * @param {Number} su_a su a 입력값
     * @param {Number} su_b su b 입력값
     * @param {Number} su_c su c 입력값
     * @param {Number} su_alpha su alpha 입력값
     * @param {Number} su_beta su beta 입력값
     * @param {Number} su_gamma su gamma 입력값
     */
    SetValue(a, b, c, alpha, beta, gamma, su_a, su_b, su_c, su_alpha, su_beta, su_gamma) {
        this._a = a;
        this._b = b;
        this._c = c;

        this._alpha = alpha;
        this._beta = beta;
        this._gamma = gamma;

        this._su_a = su_a;
        this._su_b = su_b;
        this._su_c = su_c;

        this._su_alpha = su_alpha;
        this._su_beta = su_beta;
        this._su_gamma = su_gamma;
    }
}

/**
 * SystemData 세팅
 * @param {Number} idx 인덱스
 * @param {String} name 이름
 * @param {Array} enableLattice lattice 활성화 정보
 * @param {Number} start 포함하는 space group 시작 인덱스
 * @param {Number} end 포함하는 space group 종료 인덱스
 */
function setSystemData(idx, name, enableLattice, start, end) {
    let system_def = new CSystemDef();
    system_def.setName(name);
    system_def.setEnableLattice(enableLattice);
    system_def.setRange(start, end);


    SystemDef._defList[name] = system_def;
    SystemDef._numList[idx] = system_def;
}

/**
 * SpaceGroupData 세팅
 * @param {Number} idx 인덱스
 * @param {String} name 이름
 */
function setSpaceGroupData(idx, name, symidx) {
    let spaceGroup_def = new CSpaceGroupDef();
    spaceGroup_def.setName(name);

    if (!isNaN(symidx)) {
        spaceGroup_def.setIdx(symidx);
    }

    SpaceGroupDef._defList[name] = spaceGroup_def;
    SpaceGroupDef._numList[idx] = spaceGroup_def;


}

/**
 * SettingData 세팅
 * @param {Number} idx 인덱스
 * @param {String} spaceGroupName 포함되는 space group 명
 * @param {String} name 이름
 * @param {Array} lattice lattice 정보
 * @param {Boolean} mode 모드
 */
function setSettingData(idx, spaceGroupName, name, lattice, mode, symidx, enableLattice = null) {
    let setting_def = new CSettingDef();
    setting_def.setSpaceGroupName(spaceGroupName);
    setting_def.setName(name);
    setting_def.setLattice(lattice);
    setting_def.setMode(mode);
    setting_def.setEnableLattice(enableLattice);

    if (!isNaN(symidx)) {
        setting_def.setIdx(symidx);
    }

    if (mode) {
        SettingDef._defOnList[name] = setting_def;
        if (!SettingDef._numOnList[idx])
            SettingDef._numOnList[idx] = [];
        SettingDef._numOnList[idx].push(setting_def);
    }
    else {
        SettingDef._defOffList[name] = setting_def;
        if (!SettingDef._numOffList[idx])
            SettingDef._numOffList[idx] = [];
        SettingDef._numOffList[idx].push(setting_def);
    }

}

/*
setSystemData(0, "MoleCule", new CEnableLatticeDef(false, false, false, false, false, false, false, false, false, false, false, false), -1, -1);
setSystemData(1, "Custom", new CEnableLatticeDef(true, true, true, true, true, true, true, true, true, true, true, true), -1, -1);
setSystemData(2, "Triclinic", new CEnableLatticeDef(true, true, true, true, true, true, true, true, true, true, true, true), 1, 2);
setSystemData(3, "Monoclinic", new CEnableLatticeDef(true, true, true, false, true, false, true, true, true, false, true, false), 3, 15);
setSystemData(4, "Orthorhombic", new CEnableLatticeDef(true, true, true, false, false, false, true, true, true, false, false, false), 16, 74);
setSystemData(5, "Tetragonal", new CEnableLatticeDef(true, false, true, false, false, false, true, false, true, false, false, false), 75, 142);
setSystemData(6, "Trigonal", new CEnableLatticeDef(true, false, true, false, false, false, true, false, true, false, false, false), 143, 167);
setSystemData(7, "Hexagonal", new CEnableLatticeDef(true, false, true, true, false, true, false, false, false, false, false, false), 168, 194);
setSystemData(8, "Cubic", new CEnableLatticeDef(true, false, false, false, false, false, true, false, false, false, false, false), 195, 230);
*/
setSystemData(0, "Custom", new CEnableLatticeDef(true, true, true, true, true, true, true, true, true, true, true, true), -1, -1);
setSystemData(1, "Molecule", new CEnableLatticeDef(false, false, false, false, false, false, false, false, false, false, false, false), -1, -1);
setSystemData(2, "Monoclinic", new CEnableLatticeDef(true, true, true, false, true, false, true, true, true, false, true, false), 1, 2);
setSystemData(3, "Hexagonal", new CEnableLatticeDef(true, false, true, true, false, true, false, false, false, false, false, false), 3, 4);
setSystemData(4, "Cubic", new CEnableLatticeDef(true, false, false, false, false, false, true, false, false, false, false, false), 5, 6);


setSpaceGroupData(0, "P 2", 2);
setSpaceGroupData(1, "P 21", 3);

setSpaceGroupData(2, "P 6", 167);
setSpaceGroupData(3, "P 61", 168);


setSpaceGroupData(4, "P 2 3", 194);
setSpaceGroupData(5, "F 2 3", 195);


// P 2
setSettingData(0, "P 2", "P 2(Unique axis b)", new CLatticeDef(1.41421, 1.22474, 1.22474, 90, 73.2213, 90, 0, 0, 0, 0, 0, 0), false, 0, new CEnableLatticeDef(true, true, true, false, true, false, true, true, true, false, true, false));
setSettingData(0, "P 2", "P 2(Unique axis c)", new CLatticeDef(1.41421, 1.22474, 1.22474, 90, 90, 79.1065, 0, 0, 0, 0, 0, 0), false, 1, new CEnableLatticeDef(true, true, true, false, false, true, true, true, true, false, true, false));
setSettingData(0, "P 2", "P 2(Unique axis a)", new CLatticeDef(1.22474, 1.41421, 1.22474, 90, 90, 90, 0, 0, 0, 0, 0, 0), false, 2, new CEnableLatticeDef(true, true, true, true, false, false, true, true, true, false, true, false));

// P 21
setSettingData(1, "P 21", "P 21(Unique axis b)", new CLatticeDef(1.22474, 1.22474, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false, 0, new CEnableLatticeDef(true, true, true, false, true, false, true, true, true, false, true, false));
setSettingData(1, "P 21", "P 21(Unique axis c)", new CLatticeDef(1.41421, 1.22474, 1.22474, 90, 90, 90, 0, 0, 0, 0, 0, 0), false, 1, new CEnableLatticeDef(true, true, true, false, false, true, true, true, true, false, false, true));
setSettingData(1, "P 21", "P 21(Unique axis a)", new CLatticeDef(1.22474, 1.41421, 1.22474, 90, 90, 90, 0, 0, 0, 0, 0, 0), false, 2, new CEnableLatticeDef(true, true, true, true, false, false, true, true, true, true, false, false));


// P 6
setSettingData(2, "P 6", "P 6", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false, 0);

// P 61
setSettingData(3, "P 61", "P 61", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false, 0);


// P 2 3
setSettingData(4, "P 2 3", "P 2 3", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false, 0);

// F 2 3
setSettingData(5, "F 2 3", "F 2 3", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false, 0);


/*
setSpaceGroupData(0, "P 1");
setSpaceGroupData(1, "P -1");
setSpaceGroupData(2, "P 2");
setSpaceGroupData(3, "P 21");
setSpaceGroupData(4, "C 2");
setSpaceGroupData(5, "P m");
setSpaceGroupData(6, "P c");
setSpaceGroupData(7, "C m");
setSpaceGroupData(8, "C c");
setSpaceGroupData(9, "P 2/m");
setSpaceGroupData(10, "P 21/m");
setSpaceGroupData(11, "C 2/m");
setSpaceGroupData(12, "P 2/c");
setSpaceGroupData(13, "P 21/c");
setSpaceGroupData(14, "C 2/c");
setSpaceGroupData(15, "P 2 2 2");
setSpaceGroupData(16, "P 2 2 21");
setSpaceGroupData(17, "P 21 21 2");
setSpaceGroupData(18, "P 21 21 21");
setSpaceGroupData(19, "C 2 2 21");
setSpaceGroupData(20, "C 2 2 2");
setSpaceGroupData(21, "F 2 2 2");
setSpaceGroupData(22, "I 2 2 2");
setSpaceGroupData(23, "I 21 21 21");
setSpaceGroupData(24, "P m m 2");
setSpaceGroupData(25, "P m c 21");
setSpaceGroupData(26, "P c c 2");
setSpaceGroupData(27, "P m a 2");
setSpaceGroupData(28, "P c a 21");
setSpaceGroupData(29, "P n c 2");
setSpaceGroupData(30, "P m n 21");
setSpaceGroupData(31, "P b a 2");
setSpaceGroupData(32, "P n a 21");
setSpaceGroupData(33, "P n n 2");
setSpaceGroupData(34, "C m m 2");
setSpaceGroupData(35, "C m c 21");
setSpaceGroupData(36, "C c c 2");
setSpaceGroupData(37, "A m m 2");
setSpaceGroupData(38, "A e m 2");
setSpaceGroupData(39, "A m a 2");
setSpaceGroupData(40, "A e a 2");
setSpaceGroupData(41, "F m m 2");
setSpaceGroupData(42, "F d d 2");
setSpaceGroupData(43, "I m m 2");
setSpaceGroupData(44, "I b a 2");
setSpaceGroupData(45, "I m a 2");
setSpaceGroupData(46, "P m m m");
setSpaceGroupData(47, "P n n n");
setSpaceGroupData(48, "P c c m");
setSpaceGroupData(49, "P b a n");
setSpaceGroupData(50, "P m m a");
setSpaceGroupData(51, "P n n a");
setSpaceGroupData(52, "P m n a");
setSpaceGroupData(53, "P c c a");
setSpaceGroupData(54, "P b a m");
setSpaceGroupData(55, "P c c n");
setSpaceGroupData(56, "P b c m");
setSpaceGroupData(57, "P n n m");
setSpaceGroupData(58, "P m m n");
setSpaceGroupData(59, "P b c n");
setSpaceGroupData(60, "P b c a");
setSpaceGroupData(61, "P n m a");
setSpaceGroupData(62, "C m c m");
setSpaceGroupData(63, "C m c e");
setSpaceGroupData(64, "C m m m");
setSpaceGroupData(65, "C c c m");
setSpaceGroupData(66, "C m m e");
setSpaceGroupData(67, "C c c e");
setSpaceGroupData(68, "F m m m");
setSpaceGroupData(69, "F d d d");
setSpaceGroupData(70, "I m m m");
setSpaceGroupData(71, "I b a m");
setSpaceGroupData(72, "I b c a");
setSpaceGroupData(73, "I m m a");
setSpaceGroupData(74, "P 4");
setSpaceGroupData(75, "P 41");
setSpaceGroupData(76, "P 42");
setSpaceGroupData(77, "P 43");
setSpaceGroupData(78, "I 4");
setSpaceGroupData(79, "I 41");
setSpaceGroupData(80, "P -4");
setSpaceGroupData(81, "I -4");
setSpaceGroupData(82, "P 4/m");
setSpaceGroupData(83, "P 42/m");
setSpaceGroupData(84, "P 4/n");
setSpaceGroupData(85, "P 42/n");
setSpaceGroupData(86, "I 4/m");
setSpaceGroupData(87, "I 41/a");
setSpaceGroupData(88, "P 4 2 2");
setSpaceGroupData(89, "P 4 21 2");
setSpaceGroupData(90, "P 41 2 2");
setSpaceGroupData(91, "P 41 21 2");
setSpaceGroupData(92, "P 42 2 2");
setSpaceGroupData(93, "P 42 21 2");
setSpaceGroupData(94, "P 43 2 2");
setSpaceGroupData(95, "P 43 21 2");
setSpaceGroupData(96, "I 4 2 2");
setSpaceGroupData(97, "I 41 2 2");
setSpaceGroupData(98, "P 4 m m");
setSpaceGroupData(99, "P 4 b m");
setSpaceGroupData(100, "P 42 c m");
setSpaceGroupData(101, "P 42 n m");
setSpaceGroupData(102, "P 4 c c");
setSpaceGroupData(103, "P 4 n c");
setSpaceGroupData(104, "P 42 m c");
setSpaceGroupData(105, "P 42 b c");
setSpaceGroupData(106, "I 4 m m");
setSpaceGroupData(107, "I 4 c m");
setSpaceGroupData(108, "I 41 m d");
setSpaceGroupData(109, "I 41 c d");
setSpaceGroupData(110, "P -4 2 m");
setSpaceGroupData(111, "P -4 2 c");
setSpaceGroupData(112, "P -4 21 m");
setSpaceGroupData(113, "P -4 21 c");
setSpaceGroupData(114, "P -4 m 2");
setSpaceGroupData(115, "P -4 c 2");
setSpaceGroupData(116, "P -4 b 2");
setSpaceGroupData(117, "P -4 n 2");
setSpaceGroupData(118, "I -4 m 2");
setSpaceGroupData(119, "I -4 c 2");
setSpaceGroupData(120, "I -4 2 m");
setSpaceGroupData(121, "I -4 2 d");
setSpaceGroupData(122, "P 4/m m m");
setSpaceGroupData(123, "P 4/m c c");
setSpaceGroupData(124, "P 4/n b m");
setSpaceGroupData(125, "P 4/n n c");
setSpaceGroupData(126, "P 4/m b m");
setSpaceGroupData(127, "P 4/m n c");
setSpaceGroupData(128, "P 4/n m m");
setSpaceGroupData(129, "P 4/n c c");
setSpaceGroupData(130, "P 42/m m c");
setSpaceGroupData(131, "P 42/m c m");
setSpaceGroupData(132, "P 42/n b c");
setSpaceGroupData(133, "P 42/n n m");
setSpaceGroupData(134, "P 42/m b c");
setSpaceGroupData(135, "P 42/m n m");
setSpaceGroupData(136, "P 42/n m c");
setSpaceGroupData(137, "P 42/n c m");
setSpaceGroupData(138, "I 4/m m m");
setSpaceGroupData(139, "I 4/m c m");
setSpaceGroupData(140, "I 41/a m d");
setSpaceGroupData(141, "I 41/a c d");
setSpaceGroupData(142, "P 3");
setSpaceGroupData(143, "P 31");
setSpaceGroupData(144, "P 32");
setSpaceGroupData(145, "R 3");
setSpaceGroupData(146, "P -3");
setSpaceGroupData(147, "R -3");
setSpaceGroupData(148, "P 3 1 2");
setSpaceGroupData(149, "P 3 2 1");
setSpaceGroupData(150, "P 31 1 2");
setSpaceGroupData(151, "P 31 2 1");
setSpaceGroupData(152, "P 32 1 2");
setSpaceGroupData(153, "P 32 2 1");
setSpaceGroupData(154, "R 3 2");
setSpaceGroupData(155, "P 3 m 1");
setSpaceGroupData(156, "P 3 1 m");
setSpaceGroupData(157, "P 3 c 1");
setSpaceGroupData(158, "P 3 1 c");
setSpaceGroupData(159, "R 3 m");
setSpaceGroupData(160, "R 3 c");
setSpaceGroupData(161, "P -3 1 m");
setSpaceGroupData(162, "P -3 1 c");
setSpaceGroupData(163, "P -3 m 1");
setSpaceGroupData(164, "P -3 c 1");
setSpaceGroupData(165, "R -3 m");
setSpaceGroupData(166, "R -3 c");

setSpaceGroupData(167, "P 6");
setSpaceGroupData(168, "P 61");

setSpaceGroupData(169, "P 65");
setSpaceGroupData(170, "P 62");
setSpaceGroupData(171, "P 64");
setSpaceGroupData(172, "P 63");
setSpaceGroupData(173, "P -6");
setSpaceGroupData(174, "P 6/m");
setSpaceGroupData(175, "P 63/m");
setSpaceGroupData(176, "P 6 2 2");
setSpaceGroupData(177, "P 61 2 2");
setSpaceGroupData(178, "P 65 2 2");
setSpaceGroupData(179, "P 62 2 2");
setSpaceGroupData(180, "P 64 2 2");
setSpaceGroupData(181, "P 63 2 2");
setSpaceGroupData(182, "P 6 m m");
setSpaceGroupData(183, "P 6 c c");
setSpaceGroupData(184, "P 63 c m");
setSpaceGroupData(185, "P 63 m c");
setSpaceGroupData(186, "P -6 m 2");
setSpaceGroupData(187, "P -6 c 2");
setSpaceGroupData(188, "P -6 2 m");
setSpaceGroupData(189, "P -6 2 c");
setSpaceGroupData(190, "P 6/m m m");
setSpaceGroupData(191, "P 6/m c c");
setSpaceGroupData(192, "P 63/m c m");
setSpaceGroupData(193, "P 63/m m c");

setSpaceGroupData(194, "P 2 3");
setSpaceGroupData(195, "F 2 3");

setSpaceGroupData(196, "I 2 3");
setSpaceGroupData(197, "P 21 3");
setSpaceGroupData(198, "I 21 3");
setSpaceGroupData(199, "P m -3");
setSpaceGroupData(200, "P n -3");
setSpaceGroupData(201, "F m -3");
setSpaceGroupData(202, "F d -3");
setSpaceGroupData(203, "I m -3");
setSpaceGroupData(204, "P a -3");
setSpaceGroupData(205, "I a -3");
setSpaceGroupData(206, "P 4 3 2");
setSpaceGroupData(207, "P 42 3 2");
setSpaceGroupData(208, "F 4 3 2");
setSpaceGroupData(209, "F 41 3 2");
setSpaceGroupData(210, "I 4 3 2");
setSpaceGroupData(211, "P 43 3 2");
setSpaceGroupData(212, "P 41 3 2");
setSpaceGroupData(213, "I 41 3 2");
setSpaceGroupData(214, "P -4 3 m");
setSpaceGroupData(215, "F -4 3 m");
setSpaceGroupData(216, "I -4 3 m");
setSpaceGroupData(217, "P -4 3 n");
setSpaceGroupData(218, "F -4 3 c");
setSpaceGroupData(219, "I -4 3 d");
setSpaceGroupData(220, "P m -3 m");
setSpaceGroupData(221, "P n -3 n");
setSpaceGroupData(222, "P m -3 n");
setSpaceGroupData(223, "P n -3 m");
setSpaceGroupData(224, "F m -3 m");
setSpaceGroupData(225, "F m -3 c");
setSpaceGroupData(226, "F d -3 m");
setSpaceGroupData(227, "F d -3 c");
setSpaceGroupData(228, "I m -3 m");
setSpaceGroupData(229, "I a -3 d");


// P 1

setSettingData(0, "P 1", "P 1", new CLatticeDef(0.66667, 0.5, 0.44096, 89.9996, 100.8934, 89.9997, 0, 0, 0, 0, 0, 0), false);
setSettingData(0, "P 1", "A 1", new CLatticeDef(0.66667, 0.66667, 0.66667, 97.1808, 97.1808, 97.1808, 0, 0, 0, 0, 0, 0), false);
setSettingData(0, "P 1", "B 1", new CLatticeDef(0.86603, 0.5, 0.72649, 90, 66.5865, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(0, "P 1", "C 1", new CLatticeDef(0.83334, 0.83334, 0.44096, 81.3045, 98.6955, 106.2607, 0, 0, 0, 0, 0, 0), false);
setSettingData(0, "P 1", "I 1", new CLatticeDef(0.66667, 0.72649, 0.83334, 50.0313, 69.5127, 73.3353, 0, 0, 0, 0, 0, 0), false);
setSettingData(0, "P 1", "F 1", new CLatticeDef(1.00001, 0.88192, 1.00001, 89.9995, 120.0002, 124.5377, 0, 0, 0, 0, 0, 0), false);
setSettingData(0, "P 1", "R 1", new CLatticeDef(1.41421, 1.41421, 1.73205, 90, 90, 120, 0, 0, 0, 0, 0, 0), false);


// P -1
setSettingData(1, "P -1", "P -1", new CLatticeDef(0.66667, 0.5, 0.44096, 89.9996, 100.8936, 89.9997, 0, 0, 0, 0, 0, 0), false);
setSettingData(1, "P -1", "A -1", new CLatticeDef(0.66667, 0.66667, 0.66667, 97.1808, 97.1811, 97.1806, 0, 0, 0, 0, 0, 0), false);
setSettingData(1, "P -1", "B -1", new CLatticeDef(0.86603, 0.5, 0.72649, 89.9995, 66.5868, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(1, "P -1", "C -1", new CLatticeDef(0.83334, 0.83334, 0.44096, 81.3039, 98.6955, 106.2601, 0, 0, 0, 0, 0, 0), false);
setSettingData(1, "P -1", "I -1", new CLatticeDef(0.66667, 0.72649, 0.83334, 50.0315, 69.5125, 73.3351, 0, 0, 0, 0, 0, 0), false);
setSettingData(1, "P -1", "F -1", new CLatticeDef(1, 0.88192, 1.00001, 89.9999, 120.0000, 124.5375, 0, 0, 0, 0, 0, 0), false);
setSettingData(1, "P -1", "R -1", new CLatticeDef(0.83334, 0.66667, 0.88193, 79.1063, 79.1065, 110.4871, 0, 0, 0, 0, 0, 0), false);


// P 2
setSettingData(2, "P 2", "P 2(Unique axis b)", new CLatticeDef(1.41421, 1.22474, 1.22474, 90, 73.2213,90,0,0,0,0,0,0), false);
setSettingData(2, "P 2", "P 2(Unique axis c)", new CLatticeDef(1.41421, 1.22474, 1.22474, 90, 90, 79.1065,0,0,0,0,0,0), false);
setSettingData(2, "P 2", "P 2(Unique axis a)", new CLatticeDef(1.22474, 1.41421, 1.22474, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 21
setSettingData(3, "P 21", "P 21(Unique axis b)", new CLatticeDef(1.22474, 1.22474, 1.41421, 90,90,90, 0,0 ,0,0,0,0), false);
setSettingData(3, "P 21", "P 21(Unique axis c)", new CLatticeDef(1.41421, 1.22474, 1.22474, 90,90,90, 0,0 ,0,0,0,0), false);
setSettingData(3, "P 21", "P 21(Unique axis a)", new CLatticeDef(1.22474, 1.41421, 1.22474, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// C 2
setSettingData(4, "C 2", "C 2(Unique aixs b)", new CLatticeDef(1.73204, 1.41421, 1.22474, 90, 135, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(4, "C 2", "A 2(Unique aixs b)", new CLatticeDef(1.22474, 1.41421, 1.73204, 90, 134.9999, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(4, "C 2", "I 2(Unique aixs b)", new CLatticeDef(1.22474, 1.41421, 1.22474, 90, 90.0002, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(4, "C 2", "A 2(Unique aixs c)", new CLatticeDef(1.22474, 1.41421, 1.22474, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(4, "C 2", "B 2(Unique aixs c)", new CLatticeDef(1.41421, 1.87082, 1.22474, 90, 90, 139.1066, 0, 0, 0, 0, 0, 0), false);
setSettingData(4, "C 2", "I 2(Unique aixs c)", new CLatticeDef(1.87082, 1.22474, 1.22474, 90, 90, 130.8932, 0, 0, 0, 0, 0, 0), false);
setSettingData(4, "C 2", "B 2(Unique aixs a)", new CLatticeDef(1.87082, 1.22474, 1.22474, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(4, "C 2", "C 2(Unique aixs a)", new CLatticeDef(1.87082, 1.22474, 1.73204, 135.0000, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(4, "C 2", "I 2(Unique aixs a)", new CLatticeDef(1.87082, 1.73204, 1.22474, 134.9999, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P m
setSettingData(5, "P m", "P m (Unique axis b)", new CLatticeDef(1.87082, 1.73204, 1.22474, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(5, "P m", "P m (Unique axis c)", new CLatticeDef(1.22474, 1.87082, 1.73204, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(5, "P m", "P m (Unique axis a)", new CLatticeDef(1.73204, 1.22474, 1.87082, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P c
setSettingData(6, "P c", "P c (Unique axis b)", new CLatticeDef(2.54950, 1.22474, 1.73204, 90, 132.7942, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(6, "P c", "P n (Unique axis b)", new CLatticeDef(1.87082, 1.22474, 2.54950, 90, 137.2060, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(6, "P c", "P a (Unique axis b)", new CLatticeDef(1.73204, 1.22474, 1.87082, 90, 89.9998, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(6, "P c", "P a (Unique axis c)", new CLatticeDef(1.73204, 1.22474, 1.87082, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(6, "P c", "P n (Unique axis c)", new CLatticeDef(1.22474, 2.12131, 1.87082, 90, 90, 125.2645, 0, 0, 0, 0, 0, 0), false);
setSettingData(6, "P c", "P b (Unique axis c)", new CLatticeDef(2.12131, 1.73204, 1.87082, 90, 90, 144.7356, 0, 0, 0, 0, 0, 0), false);
setSettingData(6, "P c", "P b (Unique axis a)", new CLatticeDef(2.12131, 1.73204, 1.87082, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(6, "P c", "P n (Unique axis a)", new CLatticeDef(2.12131, 1.87082, 2.54950, 137.2059, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(6, "P c", "P c (Unique axis a)", new CLatticeDef(2.12131, 2.54950, 1.73204, 132.7942, 90, 90, 0, 0, 0, 0, 0, 0), false);

// C m
setSettingData(7, "C m", "C m (Unique axis b)", new CLatticeDef(4.24264, 3.46410, 1.73205, 90, 114.0948, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(7, "C m", "C m (Unique axis b)", new CLatticeDef(3.87298, 3.46410, 4.24264, 90, 155.9051, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(7, "C m", "C m (Unique axis b)", new CLatticeDef(1.73205, 3.46410, 3.87298, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(7, "C m", "C m (Unique axis b)", new CLatticeDef(1.73205, 4.24264, 3.46410, 90, 90, 114.0948, 0, 0, 0, 0, 0, 0), false);
setSettingData(7, "C m", "C m (Unique axis b)", new CLatticeDef(4.24264, 3.87298, 3.46410, 90, 90, 155.9051, 0, 0, 0, 0, 0, 0), false);
setSettingData(7, "C m", "C m (Unique axis b)", new CLatticeDef(3.87298, 1.73205, 3.46410, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(7, "C m", "C m (Unique axis b)", new CLatticeDef(3.46410, 1.73205, 4.24264, 114.0948, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(7, "C m", "C m (Unique axis b)", new CLatticeDef(3.46410, 4.24264, 3.87298, 155.9051, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(7, "C m", "C m (Unique axis b)", new CLatticeDef(3.46410, 3.87298, 1.73205, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// C c
setSettingData(8, "C c", "C c (Unique axis b)", new CLatticeDef(4.24264, 3.46410, 1.73205, 90, 114.0948, 90, 0,0,0,0,0,0), false);
setSettingData(8, "C c", "A n (Unique axis b)", new CLatticeDef(3.87298, 3.46410, 4.24264, 90, 155.9051, 90, 0,0,0,0,0,0), false);
setSettingData(8, "C c", "I a (Unique axis b)", new CLatticeDef(1.73205, 3.46410, 3.87298, 90, 90, 90, 0,0,0,0,0,0), false);
setSettingData(8, "C c", "A a (Unique axis c)", new CLatticeDef(1.73205, 4.24264, 3.46410, 90, 90, 114.0948,0,0,0,0,0,0), false);
setSettingData(8, "C c", "B n (Unique axis c)", new CLatticeDef(4.24264, 3.87297, 90,90,155.9051,0,0,0,0,0,0), false);
setSettingData(8, "C c", "I b (Unique axis c)", new CLatticeDef(3.87298, 1.73205, 3.46410, 90,90,90,0,0,0,0,0,0), false);
setSettingData(8, "C c", "B b (Unique axis a)", new CLatticeDef(3.46410, 1.73205, 2.42464, 114.0948, 90,90,0,0,0,0,0,0), false);
setSettingData(8, "C c", "C n (Unique axis a)", new CLatticeDef(3.46410, 4.24264, 3.87298, 155.9051, 90, 90,0,0,0,0,0,0), false);
setSettingData(8, "C c", "I c (Unique axis a)", new CLatticeDef(3.46410, 3.87298, 1.73205, 90,90,90,0,0,0,0,0,0), false);
setSettingData(8, "C c", "A a (Unique axis b)", new CLatticeDef(1.73205, 3.46410, 4.24264, 90, 114.0948, 90,0,0,0,0,0,0), false);
setSettingData(8, "C c", "C n (Unique axis b)", new CLatticeDef(4.24264, 3.46410, 3.87298, 90, 155.9051, 90,0,0,0,0,0,0), false);
setSettingData(8, "C c", "I c (Unique axis b)", new CLatticeDef(3.87298, 3.46410, 1.73205, 90,90,90,0,0,0,0,0,0), false);
setSettingData(8, "C c", "B b (Unique axis c)", new CLatticeDef(4.24264, 1.73205, 3.46410, 90, 90, 114.0948, 0,0,0,0,0,0), false);
setSettingData(8, "C c", "A n (Unique axis c)", new CLatticeDef(3.87298, 4.24264, 3.46410, 90, 90, 155.9051, 0,0,0,0,0,0), false);
setSettingData(8, "C c", "I a (Unique axis c)", new CLatticeDef(1.73205, 3.87298, 3.46410, 90,90,90,0,0,0,0,0,0), false);
setSettingData(8, "C c", "C c (Unique axis a)", new CLatticeDef(3.46410, 4.24264, 1.73205, 114.0948, 90, 90, 0,0,0,0,0,0), false);
setSettingData(8, "C c", "B n (Unique axis a)", new CLatticeDef(3.46410, 3.87298, 4.24264, 155.9051, 90,90, 0,0,0,0,0,0), false);
setSettingData(8, "C c", "I b (Unique axis a)", new CLatticeDef(3.46410, 1.73205, 3.87298, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 2/m
setSettingData(9, "P 2/m", "P 2/m (Unique axis b)", new CLatticeDef(3.87298, 3.46410, 1.73205, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(9, "P 2/m", "P 2/m (Unique axis c)", new CLatticeDef(3.87298, 1.73205, 3.46410, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(9, "P 2/m", "P 2/m (Unique axis a)", new CLatticeDef(3.46410, 1.73205, 3.87298, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 21/m
setSettingData(10, "P 21/m", "P 21/m (Unique axis b)", new CLatticeDef(3.87298, 3.46410, 1.73205, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(10, "P 21/m", "P 21/m (Unique axis c)", new CLatticeDef(1.73205, 3.87298, 3.46410, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(10, "P 21/m", "P 21/m (Unique axis a)", new CLatticeDef(3.46410, 1.73205, 3.87298, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// C 2/m
setSettingData(11, "C 2/m", "C 2/m (Unique axis b)", new CLatticeDef(5.19615, 1.73205, 3.46410, 90, 131.8103, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(11, "C 2/m", "A 2/m (Unique axis b)", new CLatticeDef(3.87298, 1.73205, 5.19615, 90, 138.1897, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(11, "C 2/m", "I 2/m (Unique axis b)", new CLatticeDef(3.46410, 1.73205, 3.87298, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(11, "C 2/m", "A 2/m (Unique axis c)", new CLatticeDef(3.46410, 5.19615, 1.73205, 90, 90, 131.8103, 0, 0, 0, 0, 0, 0), false);
setSettingData(11, "C 2/m", "B 2/m (Unique axis c)", new CLatticeDef(5.19615, 3.87298, 1.73205, 90, 90, 138.1897, 0, 0, 0, 0, 0, 0), false);
setSettingData(11, "C 2/m", "I 2/m (Unique axis c)", new CLatticeDef(3.87298, 3.46410, 1.73205, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(11, "C 2/m", "B 2/m (Unique axis a)", new CLatticeDef(1.73205, 3.46410, 5.19615, 131.8103, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(11, "C 2/m", "C 2/m (Unique axis a)", new CLatticeDef(1.73205, 5.19615, 3.87298, 138.1897, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(11, "C 2/m", "I 2/m (Unique axis a)", new CLatticeDef(1.73205, 3.87298, 3.46410, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 2/c
setSettingData(12, "P 2/c", "P 2/c (Unique axis b)", new CLatticeDef(5.19615, 1.73205, 3.46410, 90, 131.8103, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(12, "P 2/c", "P 2/n (Unique axis b)", new CLatticeDef(3.87298, 1.73205, 5.19615, 90, 138.1897, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(12, "P 2/c", "P 2/a (Unique axis b)", new CLatticeDef(3.46410, 1.73205, 3.87298, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(12, "P 2/c", "P 2/a (Unique axis c)", new CLatticeDef(3.46410, 1.73205, 3.87298, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(12, "P 2/c", "P 2/n (Unique axis c)", new CLatticeDef(1.73205, 3.87298, 3.87298, 90, 90, 116.5650, 0, 0, 0, 0, 0, 0), false);
setSettingData(12, "P 2/c", "P 2/b (Unique axis c)", new CLatticeDef(3.87298, 3.46410, 3.87298, 90, 90, 153.4349, 0, 0, 0, 0, 0, 0), false);
setSettingData(12, "P 2/c", "P 2/b (Unique axis a)", new CLatticeDef(3.87298, 3.46410, 3.87298, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(12, "P 2/c", "P 2/n (Unique axis a)", new CLatticeDef(3.87298, 3.87298, 5.19615, 138.1897, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(12, "P 2/c", "P 2/c (Unique axis a)", new CLatticeDef(3.87298, 5.19615, 3.46410, 131.8103, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 21/c
setSettingData(13, "P 21/c", "P 21/c (Unique axis b)", new CLatticeDef(3.87298, 5.19615, 3.46410, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(13, "P 21/c", "P 21/n (Unique axis b)", new CLatticeDef(5.19615, 5.19615, 3.87298, 90, 138.1897, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(13, "P 21/c", "P 21/a (Unique axis b)", new CLatticeDef(3.46410, 5.19615, 5.19615, 90, 131.8103, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(13, "P 21/c", "P 21/a (Unique axis c)", new CLatticeDef(3.46410, 5.19615, 5.19615, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(13, "P 21/c", "P 21/n (Unique axis c)", new CLatticeDef(5.19615, 6.24499, 5.19615, 90, 90, 146.3099, 0, 0, 0, 0, 0, 0), false);
setSettingData(13, "P 21/c", "P 21/b (Unique axis c)", new CLatticeDef(6.24499, 3.46410, 5.19615, 90, 90, 123.6900, 0, 0, 0, 0, 0, 0), false);
setSettingData(13, "P 21/c", "P 21/b (Unique axis a)", new CLatticeDef(6.24499, 3.46410, 5.19615, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(13, "P 21/c", "P 21/n (Unique axis a)", new CLatticeDef(6.24499, 5.19615, 6.24499, 146.3099, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(13, "P 21/c", "P 21/c (Unique axis a)", new CLatticeDef(6.24499, 6.24499, 3.46410, 123.6900, 90, 90, 0, 0, 0, 0, 0, 0), false);

// C 2/c
setSettingData(14, "C 2/c", "C 2/c (Unique axis b)", new CLatticeDef(6.24499, 6.24499, 3.46410, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(14, "C 2/c", "A 2/n (Unique axis b)", new CLatticeDef(7.14142, 6.24499, 6.24499, 90, 150.9828, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(14, "C 2/c", "I 2/a (Unique axis b)", new CLatticeDef(3.46410, 6.24499, 7.14142, 90, 119.0172, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(14, "C 2/c", "A 2/a (Unique axis c)", new CLatticeDef(3.46410, 6.24499, 6.24499, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(14, "C 2/c", "B 2/n (Unique axis c)", new CLatticeDef(6.24499, 7.14142, 7.14142, 90, 90, 150.9828, 0, 0, 0, 0, 0, 0), false);
setSettingData(14, "C 2/c", "I 2/b (Unique axis c)", new CLatticeDef(7.14142, 3.46410, 7.14142, 90, 90, 119.0171, 0, 0, 0, 0, 0, 0), false);
setSettingData(14, "C 2/c", "B 2/b (Unique axis a)", new CLatticeDef(7.14142, 3.46410, 7.14142, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(14, "C 2/c", "C 2/n (Unique axis a)", new CLatticeDef(7.14142, 7.14142, 7.93725, 115.8767, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(14, "C 2/c", "I 2/c (Unique axis a)", new CLatticeDef(7.14142, 7.93725, 3.46410, 154.1233, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(14, "C 2/c", "A 2/a (Unique axis b)", new CLatticeDef(7.14142, 7.93725, 3.46410, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(14, "C 2/c", "C 2/n (Unique axis b)", new CLatticeDef(3.46410, 7.93725, 7.93724, 90, 115.8767, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(14, "C 2/c", "I 2/c (Unique axis b)", new CLatticeDef(7.93724, 7.93725, 7.14142, 90, 154.1233, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(14, "C 2/c", "B 2/b (Unique axis c)", new CLatticeDef(7.93724, 7.93725, 7.14142, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(14, "C 2/c", "A 2/n (Unique axis c)", new CLatticeDef(11.22496, 7.93724, 7.14142, 90, 90, 135, 0, 0, 0, 0, 0, 0), false);
setSettingData(14, "C 2/c", "I 2/a (Unique axis c)", new CLatticeDef(7.93725, 11.22496, 7.14142, 90, 90, 135, 0, 0, 0, 0, 0, 0), false);
setSettingData(14, "C 2/c", "C 2/c (Unique axis a)", new CLatticeDef(7.93725, 11.22496, 7.14142, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(14, "C 2/c", "B 2/n (Unique axis a)", new CLatticeDef(7.93725, 13.30412, 11.22496, 147.5351, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(14, "C 2/c", "I 2/b (Unique axis a)", new CLatticeDef(7.93725, 7.14142, 13.30412, 122.4649, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 2 2 2
setSettingData(15, "P 2 2 2", "P 2 2 2 (a,b,c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(15, "P 2 2 2", "P 2 2 2 (b,a,-c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(15, "P 2 2 2", "P 2 2 2 (c,a,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(15, "P 2 2 2", "P 2 2 2 (-c,b,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(15, "P 2 2 2", "P 2 2 2 (b,c,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(15, "P 2 2 2", "P 2 2 2 (a,-c,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 2 2 21
setSettingData(16, "P 2 2 21", "P 2 2 21 (a,b,c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(16, "P 2 2 21", "P 2 2 21 (b,a,-c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(16, "P 2 2 21", "P 2 2 21 (c,a,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(16, "P 2 2 21", "P 2 2 21 (-c,b,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(16, "P 2 2 21", "P 2 2 21 (b,c,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(16, "P 2 2 21", "P 2 2 21 (a,-c,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 21 21 2
setSettingData(17, "P 21 21 2", "P 21 21 2 (a,b,c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(17, "P 21 21 2", "P 21 21 2 (b,a,-c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(17, "P 21 21 2", "P 21 21 2 (c,a,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(17, "P 21 21 2", "P 21 21 2 (-c,b,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(17, "P 21 21 2", "P 21 21 2 (b,c,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(17, "P 21 21 2", "P 21 21 2 (a,-c,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 21 21 21
setSettingData(18, "P 21 21 21", "P 21 21 21 (a,b,c)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(18, "P 21 21 21", "P 21 21 21 (b,a,-c)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(18, "P 21 21 21", "P 21 21 21 (c,a,b)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(18, "P 21 21 21", "P 21 21 21 (-c,b,a)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(18, "P 21 21 21", "P 21 21 21 (b,c,a)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(18, "P 21 21 21", "P 21 21 21 (a,-c,b)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// C 2 2 21
setSettingData(19, "C 2 2 21", "C 2 2 21 (a,b,c)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(19, "C 2 2 21", "C 2 2 21 (b,a,-c)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(19, "C 2 2 21", "C 2 2 21 (c,a,b)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(19, "C 2 2 21", "C 2 2 21 (-c,b,a)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(19, "C 2 2 21", "C 2 2 21 (b,c,a)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(19, "C 2 2 21", "C 2 2 21 (a,-c,b)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// C 2 2 2
setSettingData(20, "C 2 2 2", "C 2 2 2 (a,b,c)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(20, "C 2 2 2", "C 2 2 2 (b,a,-c)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(20, "C 2 2 2", "C 2 2 2 (c,a,b)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(20, "C 2 2 2", "C 2 2 2 (-c,b,a)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(20, "C 2 2 2", "C 2 2 2 (b,c,a)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(20, "C 2 2 2", "C 2 2 2 (a,-c,b)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// F 2 2 2
setSettingData(21, "F 2 2 2", "F 2 2 2 (a,b,c)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(21, "F 2 2 2", "F 2 2 2 (b,a,-c)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(21, "F 2 2 2", "F 2 2 2 (c,a,b)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(21, "F 2 2 2", "F 2 2 2 (-c,b,a)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(21, "F 2 2 2", "F 2 2 2 (b,c,a)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(21, "F 2 2 2", "F 2 2 2 (a,-c,b)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// I 2 2 2
setSettingData(22, "I 2 2 2", "I 2 2 2 (a,b,c)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(22, "I 2 2 2", "I 2 2 2 (b,a,-c)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(22, "I 2 2 2", "I 2 2 2 (c,a,b)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(22, "I 2 2 2", "I 2 2 2 (-c,b,a)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(22, "I 2 2 2", "I 2 2 2 (b,c,a)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(22, "I 2 2 2", "I 2 2 2 (a,-c,b)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// I 21 21 21
setSettingData(23, "I 21 21 21", "I 21 21 21 (a,b,c)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(23, "I 21 21 21", "I 21 21 21 (b,a,-c)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(23, "I 21 21 21", "I 21 21 21 (c,a,b)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(23, "I 21 21 21", "I 21 21 21 (-c,b,a)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(23, "I 21 21 21", "I 21 21 21 (b,c,a)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(23, "I 21 21 21", "I 21 21 21 (a,-c,b)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P m m 2
setSettingData(24, "P m m 2", "P m m 2 (a,b,c)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(24, "P m m 2", "P m m 2 (b,a,-c)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(24, "P m m 2", "P m m 2 (c,a,b)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(24, "P m m 2", "P m m 2 (-c,b,a)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(24, "P m m 2", "P m m 2 (b,c,a)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(24, "P m m 2", "P m m 2 (a,-c,b)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P m c 21
setSettingData(25, "P m c 21", "P m c 21 (a,b,c)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(25, "P m c 21", "P m c 21 (b,a,-c)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(25, "P m c 21", "P m c 21 (c,a,b)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(25, "P m c 21", "P m c 21 (-c,b,a)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(25, "P m c 21", "P m c 21 (b,c,a)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(25, "P m c 21", "P m c 21 (a,-c,b)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P c c 2
setSettingData(26, "P c c 2", "P c c 2 (a,b,c)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(26, "P c c 2", "P c c 2 (b,a,-c)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(26, "P c c 2", "P c c 2 (c,a,b)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(26, "P c c 2", "P c c 2 (-c,b,a)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(26, "P c c 2", "P c c 2 (b,c,a)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(26, "P c c 2", "P c c 2 (a,-c,b)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P m a 2
setSettingData(27, "P m a 2", "P m a 2 (a,b,c)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(27, "P m a 2", "P m a 2 (b,a,-c)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(27, "P m a 2", "P m a 2 (c,a,b)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(27, "P m a 2", "P m a 2 (-c,b,a)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(27, "P m a 2", "P m a 2 (b,c,a)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(27, "P m a 2", "P m a 2 (a,-c,b)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P c a 21
setSettingData(28, "P c a 21", "P c a 21 (a,b,c)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(28, "P c a 21", "P c a 21 (b,a,-c)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(28, "P c a 21", "P c a 21 (c,a,b)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(28, "P c a 21", "P c a 21 (-c,b,a)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(28, "P c a 21", "P c a 21 (b,c,a)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(28, "P c a 21", "P c a 21 (a,-c,b)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P n c 2
setSettingData(29, "P n c 2", "P n c 2 (a,b,c)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(29, "P n c 2", "P n c 2 (b,a,-c)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(29, "P n c 2", "P n c 2 (c,a,b)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(29, "P n c 2", "P n c 2 (-c,b,a)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(29, "P n c 2", "P n c 2 (b,c,a)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(29, "P n c 2", "P n c 2 (a,-c,b)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P m n 21
setSettingData(30, "P m n 21", "P m n 21 (a,b,c)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(30, "P m n 21", "P m n 21 (b,a,-c)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(30, "P m n 21", "P m n 21 (c,a,b)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(30, "P m n 21", "P m n 21 (-c,b,a)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(30, "P m n 21", "P m n 21 (b,c,a)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(30, "P m n 21", "P m n 21 (a,-c,b)", new CLatticeDef(1,1,1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P b a 2
setSettingData(31, "P b a 2", "P b a 2 (a,b,c)", new CLatticeDef(1.41421, 1, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(31, "P b a 2", "P b a 2 (b,a,-c)", new CLatticeDef(1, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(31, "P b a 2", "P b a 2 (c,a,b)", new CLatticeDef(1.41421, 1.41421, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(31, "P b a 2", "P b a 2 (-c,b,a)", new CLatticeDef(1.41421, 1, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(31, "P b a 2", "P b a 2 (b,c,a)", new CLatticeDef(1, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(31, "P b a 2", "P b a 2 (a,-c,b)", new CLatticeDef(1.41421, 1.41421, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P n a 21
setSettingData(32, "P n a 21", "P n a 21 (a,b,c)", new CLatticeDef(1.41421, 1, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(32, "P n a 21", "P n a 21 (b,a,-c)", new CLatticeDef(1, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(32, "P n a 21", "P n a 21 (c,a,b)", new CLatticeDef(1.41421, 1.41421, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(32, "P n a 21", "P n a 21 (-c,b,a)", new CLatticeDef(1.41421, 1, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(32, "P n a 21", "P n a 21 (b,c,a)", new CLatticeDef(1, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(32, "P n a 21", "P n a 21 (a,-c,b)", new CLatticeDef(1.41421, 1.41421, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P n n 2
setSettingData(33, "P n n 2", "P n n 2 (a,b,c)", new CLatticeDef(1.41421, 1, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(33, "P n n 2", "P n n 2 (b,a,-c)", new CLatticeDef(1, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(33, "P n n 2", "P n n 2 (c,a,b)", new CLatticeDef(1.41421, 1.41421, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(33, "P n n 2", "P n n 2 (-c,b,a)", new CLatticeDef(1.41421, 1, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(33, "P n n 2", "P n n 2 (b,c,a)", new CLatticeDef(1, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(33, "P n n 2", "P n n 2 (a,-c,b)", new CLatticeDef(1.41421, 1.41421, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// C m m 2
setSettingData(34, "C m m 2", "C m m 2 (a,b,c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(34, "C m m 2", "C m m 2 (b,a,-c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(34, "C m m 2", "A 2 m m (c,a,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(34, "C m m 2", "A 2 m m (-c,b,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(34, "C m m 2", "B m 2 m (b,c,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(34, "C m m 2", "B m 2 m (a,-c,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// C m c 21
setSettingData(35, "C m c 21", " ()", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(35, "C m c 21", " ()", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(35, "C m c 21", " ()", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(35, "C m c 21", " ()", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(35, "C m c 21", " ()", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(35, "C m c 21", " ()", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(35, "C m c 21", " ()", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// C c c 2
setSettingData(36, "C c c 2", " ()", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(36, "C c c 2", " ()", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(36, "C c c 2", " ()", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(36, "C c c 2", " ()", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(36, "C c c 2", " ()", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(36, "C c c 2", " ()", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// A m m 2
setSettingData(37, "A m m 2", " ()", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(37, "A m m 2", " ()", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(37, "A m m 2", " ()", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(37, "A m m 2", " ()", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(37, "A m m 2", " ()", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(37, "A m m 2", " ()", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// A e m 2
setSettingData(38, "A e m 2", " ()", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(38, "A e m 2", " ()", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(38, "A e m 2", " ()", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(38, "A e m 2", " ()", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(38, "A e m 2", " ()", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(38, "A e m 2", " ()", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// A m a 2
setSettingData(39, "A m a 2", " ()", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(39, "A m a 2", " ()", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(39, "A m a 2", " ()", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(39, "A m a 2", " ()", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(39, "A m a 2", " ()", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(39, "A m a 2", " ()", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// A e a 2
setSettingData(40, "A e a 2", " ()", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(40, "A e a 2", " ()", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(40, "A e a 2", " ()", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(40, "A e a 2", " ()", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(40, "A e a 2", " ()", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(40, "A e a 2", " ()", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// F m m 2
setSettingData(41, "F m m 2", "F m m 2 (a,b,c)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(41, "F m m 2", "F m m 2 (b,a,-c)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(41, "F m m 2", "F m m 2 (c,a,b)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(41, "F m m 2", "F m m 2 (-c,b,a)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(41, "F m m 2", "F m m 2 (b,c,a)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(41, "F m m 2", "F m m 2 (a,-c,b)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// F d d 2
setSettingData(42, "F d d 2", "F d d 2 (a,b,c)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(42, "F d d 2", "F d d 2 (b,a,-c)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(42, "F d d 2", "F d d 2 (c,a,b)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(42, "F d d 2", "F d d 2 (-c,b,a)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(42, "F d d 2", "F d d 2 (b,c,a)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(42, "F d d 2", "F d d 2 (a,-c,b)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// I m m 2
setSettingData(43, "I m m 2", "I m m 2 (a,b,c)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(43, "I m m 2", "I m m 2 (b,a,-c)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(43, "I m m 2", "I m m 2 (c,a,b)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(43, "I m m 2", "I m m 2 (-c,b,a)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(43, "I m m 2", "I m m 2 (b,c,a)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(43, "I m m 2", "I m m 2 (a,-c,b)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// I b a 2
setSettingData(44, "I b a 2", "I b a 2 (a,b,c)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(44, "I b a 2", "I b a 2 (b,a,-c)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(44, "I b a 2", "I b a 2 (c,a,b)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(44, "I b a 2", "I b a 2 (-c,b,a)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(44, "I b a 2", "I b a 2 (b,c,a)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(44, "I b a 2", "I b a 2 (a,-c,b)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// I m a 2
setSettingData(45, "I m a 2", "I m a 2 (a,b,c)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(45, "I m a 2", "I b m 2 (b,a,-c)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(45, "I m a 2", "I 2 m b (c,a,b)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(45, "I m a 2", "I 2 c m (-c,b,a)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(45, "I m a 2", "I c 2 m (b,c,a)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(45, "I m a 2", "I m 2 a (a,-c,b)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P m m m 
setSettingData(46, "P m m m", "P m m m (a,b,c)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(46, "P m m m", "P m m m (b,a,-c)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(46, "P m m m", "P m m m (c,a,b)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(46, "P m m m", "P m m m (-c,b,a)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(46, "P m m m", "P m m m (b,c,a)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(46, "P m m m", "P m m m (a,-c,b)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P n n n
setSettingData(47, "P n n n", "P n n n (a,b,c) (Origin choice 1)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(47, "P n n n", "P n n n (a,b,c) (Origin choice 2)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(47, "P n n n", "P n n n (b,a,-c) (Origin choice 1)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(47, "P n n n", "P n n n (b,a,-c) (Origin choice 2)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(47, "P n n n", "P n n n (c,a,b) (Origin choice 1)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(47, "P n n n", "P n n n (c,a,b) (Origin choice 2)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(47, "P n n n", "P n n n (-c,b,a) (Origin choice 1)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(47, "P n n n", "P n n n (-c,b,a) (Origin choice 2)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(47, "P n n n", "P n n n (b,c,a) (Origin choice 1)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(47, "P n n n", "P n n n (b,c,a) (Origin choice 2)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(47, "P n n n", "P n n n (a,-c,b) (Origin choice 1)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(47, "P n n n", "P n n n (a,-c,b) (Origin choice 2)", new CLatticeDef(1.41421, 1.41421, 1.41421, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P c c m
setSettingData(48, "P c c m", "P c c m (a,b,c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(48, "P c c m", "P c c m (b,a,-c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(48, "P c c m", "P c c m (c,a,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(48, "P c c m", "P c c m (-c,b,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(48, "P c c m", "P c c m (b,c,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(48, "P c c m", "P c c m (a,-c,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P b a n
setSettingData(49, "P b a n", "P b a n (a,b,c) (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(49, "P b a n", "P b a n (a,b,c) (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(49, "P b a n", "P b a n (b,a,-c) (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(49, "P b a n", "P b a n (b,a,-c) (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(49, "P b a n", "P n c b (c,a,b) (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(49, "P b a n", "P n c b (c,a,b) (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(49, "P b a n", "P n c b (-c,b,a) (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(49, "P b a n", "P n c b (-c,b,a) (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(49, "P b a n", "P c n a (b,c,a) (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(49, "P b a n", "P c n a (b,c,a) (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(49, "P b a n", "P c n a (a,-c,b) (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(49, "P b a n", "P c n a (a,-c,b) (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P m m a
setSettingData(50, "P m m a", "P m m a (a,b,c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(50, "P m m a", "P m m b (b,a,-c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(50, "P m m a", "P b m m (c,a,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(50, "P m m a", "P c m m (-c,b,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(50, "P m m a", "P m c m (b,c,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(50, "P m m a", "P m a m (a,-c,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P n n a
setSettingData(51, "P n n a", "P n n a (a,b,c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(51, "P n n a", "P n n b (b,a,-c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(51, "P n n a", "P b n n (c,a,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(51, "P n n a", "P c n n (-c,b,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(51, "P n n a", "P n c n (b,c,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(51, "P n n a", "P n a n (a,-c,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P m n a
setSettingData(52, "P m n a", "P m n a (a,b,c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(52, "P m n a", "P n m b (b,a,-c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(52, "P m n a", "P b m n (c,a,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(52, "P m n a", "P c n m (-c,b,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(52, "P m n a", "P n c m (b,c,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(52, "P m n a", "P m a n (a,-c,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P c c a
setSettingData(53, "P c c a", "P c c a (a,b,c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(53, "P c c a", "P c c b (b,a,-c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(53, "P c c a", "P b a a (c,a,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(53, "P c c a", "P c a a (-c,b,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(53, "P c c a", "P b c b (b,c,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(53, "P c c a", "P b a b (a,-c,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P b a m
setSettingData(54, "P b a m", "P b a m (a,b,c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(54, "P b a m", "P b a m (b,a,-c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(54, "P b a m", "P m c b (c,a,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(54, "P b a m", "P m c b (-c,b,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(54, "P b a m", "P c m a (b,c,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(54, "P b a m", "P c m a (a,-c,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P c c n
setSettingData(55, "P c c n", "P c c n (a,b,c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(55, "P c c n", "P c c n (b,a,-c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(55, "P c c n", "P n a a (c,a,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(55, "P c c n", "P n a a (-c,b,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(55, "P c c n", "P b n b (b,c,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(55, "P c c n", "P b n b (a,-c,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P b c m
setSettingData(56, "P b c m", "P b c m (a,b,c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(56, "P b c m", "P c a m (b,a,-c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(56, "P b c m", "P m c a (c,a,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(56, "P b c m", "P m a b (-c,b,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(56, "P b c m", "P b m a (b,c,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(56, "P b c m", "P c m b (a,-c,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P n n m
setSettingData(57, "P n n m", "P n n m (a,b,c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(57, "P n n m", "P n n m (b,a,-c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(57, "P n n m", "P m n n (c,a,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(57, "P n n m", "P m n n (-c,b,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(57, "P n n m", "P n m n (b,c,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(57, "P n n m", "P n m n (a,-c,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P m m n
setSettingData(58, "P m m n", "P m m n (a,b,c) (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(58, "P m m n", "P m m n (a,b,c) (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(58, "P m m n", "P m m n (b,a,-c) (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(58, "P m m n", "P m m n (b,a,-c) (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(58, "P m m n", "P m m n (c,a,b) (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(58, "P m m n", "P m m n (c,a,b) (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(58, "P m m n", "P m m n (-c,b,a) (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(58, "P m m n", "P m m n (-c,b,a) (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(58, "P m m n", "P m m n (b,c,a) (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(58, "P m m n", "P m m n (b,c,a) (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(58, "P m m n", "P m m n (a,-c,b) (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(58, "P m m n", "P m m n (a,-c,b) (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P b c n
setSettingData(59, "P b c n", "P b c n (a,b,c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(59, "P b c n", "P c a n (b,a,-c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(59, "P b c n", "P n c a (c,a,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(59, "P b c n", "P n a b (-c,b,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(59, "P b c n", "P b n a (b,c,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(59, "P b c n", "P c n b (a,-c,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);


// P b c a
setSettingData(60, "P b c a", "P b c a (a,b,c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(60, "P b c a", "P c a b (b,a,-c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(60, "P b c a", "P b c a (c,a,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(60, "P b c a", "P c a b (-c,b,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(60, "P b c a", "P b c a (b,c,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(60, "P b c a", "P c a b (a,-c,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P n m a
setSettingData(61, "P n m a", "P n m a (a,b,c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(61, "P n m a", "P m n b (b,a,-c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(61, "P n m a", "P b n m (c,a,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(61, "P n m a", "P c m n (-c,b,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(61, "P n m a", "P m c n (b,c,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(61, "P n m a", "P n a m (a,-c,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// C m c m
setSettingData(62, "C m c m", "C m c m (a,b,c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(62, "C m c m", "C c m m (b,a,-c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(62, "C m c m", "A m m a (c,a,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(62, "C m c m", "A m a m (-c,b,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(62, "C m c m", "B b m m (b,c,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(62, "C m c m", "B m m b (a,-c,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// C m c e
setSettingData(63, "C m c e", "C m c e (a,b,c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(63, "C m c e", "C c m e (b,a,-c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(63, "C m c e", "A e m a (c,a,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(63, "C m c e", "A e a m (-c,b,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(63, "C m c e", "B b e m (b,c,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(63, "C m c e", "B m e b (a,-c,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// C m m m
setSettingData(64, "C m m m", "C m m m (a,b,c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(64, "C m m m", "C m m m (b,a,-c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(64, "C m m m", "A m m m (c,a,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(64, "C m m m", "A m m m (-c,b,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(64, "C m m m", "B m m m (b,c,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(64, "C m m m", "B m m m (a,-c,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// C c c m
setSettingData(65, " C c c m", "C c c m (a,b,c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(65, " C c c m", "C c c m (b,a,-c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(65, " C c c m", "A m a a (c,a,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(65, " C c c m", "A m a a (-c,b,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(65, " C c c m", "B b m b (b,c,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(65, " C c c m", "B b m b (a,-c,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// C m m e
setSettingData(66, "C m m e", "C m m e (a,b,c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(66, "C m m e", "C m m e (b,a,-c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(66, "C m m e", "A e m m (c,a,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(66, "C m m e", "A e m m (-c,b,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(66, "C m m e", "B m e m (b,c,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(66, "C m m e", "B m e m (a,-c,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// C c c e
setSettingData(67, "C c c e", "C c c e (a,b,c) (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(67, "C c c e", "C c c e (a,b,c) (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(67, "C c c e", "C c c e (b,a,-c) (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(67, "C c c e", "C c c e (b,a,-c) (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(67, "C c c e", "A e a a (c,a,b) (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(67, "C c c e", "A e a a (c,a,b) (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(67, "C c c e", "A e a a (-c,b,a) (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(67, "C c c e", "A e a a (-c,b,a) (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(67, "C c c e", "B b e b (b,c,a) (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(67, "C c c e", "B b e b (b,c,a) (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(67, "C c c e", "B b e b (a,-c,b) (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(67, "C c c e", "B b e b (a,-c,b) (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// F m m m
setSettingData(68, "F m m m", "F m m m (a,b,c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(68, "F m m m", "F m m m (b,a,-c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(68, "F m m m", "F m m m (c,a,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(68, "F m m m", "F m m m (-c,b,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(68, "F m m m", "F m m m (b,c,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(68, "F m m m", "F m m m (a,-c,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// F d d d
setSettingData(69, "F d d d", "F d d d (a,b,c) (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(69, "F d d d", "F d d d (a,b,c) (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(69, "F d d d", "F d d d (b,a,-c) (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(69, "F d d d", "F d d d (b,a,-c) (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(69, "F d d d", "F d d d (c,a,b) (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(69, "F d d d", "F d d d (c,a,b) (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(69, "F d d d", "F d d d (-c,b,a) (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(69, "F d d d", "F d d d (-c,b,a) (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(69, "F d d d", "F d d d (b,c,a) (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(69, "F d d d", "F d d d (b,c,a) (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(69, "F d d d", "F d d d (a,-c,b) (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(69, "F d d d", "F d d d (a,-c,b) (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// I m m m
setSettingData(70, "I m m m", "I m m m (a,b,c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(70, "I m m m", "I m m m (b,a,-c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(70, "I m m m", "I m m m (c,a,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(70, "I m m m", "I m m m (-c,b,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(70, "I m m m", "I m m m (b,c,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(70, "I m m m", "I m m m (a,-c,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// I b a m
setSettingData(71, "I b a m", "I b a m (a,b,c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(71, "I b a m", "I b a m (b,a,-c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(71, "I b a m", "I m c b (c,a,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(71, "I b a m", "I m c b (-c,b,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(71, "I b a m", "I c m a (b,c,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(71, "I b a m", "I c m a (a,-c,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// I b c a
setSettingData(72, "I b c a", "I b c a (a,b,c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(72, "I b c a", "I c a b (b,a,-c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(72, "I b c a", "I b c a (c,a,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(72, "I b c a", "I c a b (-c,b,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(72, "I b c a", "I b c a (b,c,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(72, "I b c a", "I c a b (a,-c,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// I m m a
setSettingData(73, "I m m a", "I m m a (a,b,c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(73, "I m m a", "I m m b (b,a,-c)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(73, "I m m a", "I b m m (c,a,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(73, "I m m a", "I c m m (-c,b,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(73, "I m m a", "I m c m (b,c,a)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(73, "I m m a", "I m a m (a,-c,b)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 4
setSettingData(74, "P 4", "P 4", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 41
setSettingData(75, "P 41", "P 41", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 42
setSettingData(76, "P 42", "P 42", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 43
setSettingData(77, "P 43", "P 43", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// I 4
setSettingData(78, "I 4", "I 4", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// I 41
setSettingData(79, "I 41", "I 41", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P -4
setSettingData(80, "P -4", "P -4", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// I -4
setSettingData(81, "I -4", "I -4", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 4/m
setSettingData(82, "P 4/m", "P 4/m", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 42/m
setSettingData(83, "P 42/m", "P 42/m", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 4/n
setSettingData(84, "P 4/n", "P 4/n (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(84, "P 4/n", "P 4/n (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 42/n
setSettingData(85, "P 42/n", "P 42/n (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(85, "P 42/n", "P 42/n (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// I 4/m
setSettingData(86, "I 4/m", "I 4/m", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// I 41/a
setSettingData(87, "I 41/a", "I 41/a (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(87, "I 41/a", "I 41/a (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 4 2 2
setSettingData(88, "P 4 2 2", "P 4 2 2", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 4 21 2
setSettingData(89, "P 4 21 2", "P 4 21 2", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 41 2 2
setSettingData(90, "P 41 2 2", "P 41 2 2", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 41 21 2
setSettingData(91, "P 41 21 2", "P 41 21 2", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 42 2 2
setSettingData(92, "P 42 2 2", "P 42 2 2", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 42 21 2
setSettingData(93, "P 42 21 2", "P 42 21 2", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 43 2 2
setSettingData(94, "P 43 2 2", "P 43 2 2", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 43 21 2
setSettingData(95, "P 43 21 2", "P 43 21 2", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// I 4 2 2
setSettingData(96, "I 4 2 2", "I 4 2 2", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// I 41 2 2
setSettingData(97, "I 41 2 2", "I 41 2 2", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 4 m m 
setSettingData(98, "P 4 m m", "P 4 m m", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 4 b m
setSettingData(99, "P 4 b m", "P 4 b m", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 42 c m
setSettingData(100, "P 42 c m", "P 42 c m", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 42 n m
setSettingData(101, "P 42 n m", "P 42 n m", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 4 c c
setSettingData(102, " P 4 c c", "P 4 c c", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 4 n c
setSettingData(103, "P 4 n c", "P 4 n c", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 42 m c
setSettingData(104, "P 42 m c", "P 42 m c", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 42 b c
setSettingData(105, "P 42 b c", "P 42 b c", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// I 4 m m
setSettingData(106, "I 4 m m", "I 4 m m", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// I 4 c m
setSettingData(107, "I 4 c m", "I 4 c m", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// I 41 m d
setSettingData(108, "I 41 m d", "I 41 m d", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// I 41 c d
setSettingData(109, "I 41 c d", "I 41 c d", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P -4 2 m
setSettingData(110, "P -4 2 m", "P -4 2 m", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P -4 2 c
setSettingData(111, "P -4 2 c", "P -4 2 c", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P -4 21 m
setSettingData(112, "P -4 21 m", "P -4 21 m", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P -4 21 c
setSettingData(113, "P -4 21 c", "P -4 21 c", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P -4 m 2
setSettingData(114, "P -4 m 2", "P -4 m 2", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P -4 c 2
setSettingData(115, "P -4 c 2", "P -4 c 2", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P -4 b 2
setSettingData(116, "P -4 b 2", "P -4 b 2", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P -4 n 2
setSettingData(117, "P -4 n 2", "P -4 n 2", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// I -4 m 2
setSettingData(118, "I -4 m 2", "I -4 m 2", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// I -4 c 2
setSettingData(119, "I -4 c 2", "I -4 c 2", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// I -4 2 m
setSettingData(120, "I -4 2 m", "I -4 2 m", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// I -4 2 d
setSettingData(121, "I -4 2 d", "I -4 2 d", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 4/m m m
setSettingData(122, "P 4/m m m", "P 4/m m m", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 4/m c c
setSettingData(123, "P 4/m c c", "P 4/m c c", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 4/n b m
setSettingData(124, "P 4/n b m", "P 4/n b m (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(124, "P 4/n b m", "P 4/n b m (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 4/n n c
setSettingData(125, "P 4/n n c", "P 4/n n c (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(125, "P 4/n n c", "P 4/n n c (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 4/m b m
setSettingData(126, "P 4/m b m", "P 4/m b m", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 4/m n c
setSettingData(127, "P 4/m n c", "P 4/m n c", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 4/n m m
setSettingData(128, "P 4/n m m", "P 4/n m m (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(128, "P 4/n m m", "P 4/n m m (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 4/n c c
setSettingData(129, "P 4/n c c", "P 4/n c c (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(129, "P 4/n c c", "P 4/n c c (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 42/m m c
setSettingData(130, "P 42/m m c", "P 42/m m c", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 42/m c m
setSettingData(131, "P 42/m c m", "P 42/m c m", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 42/n b c
setSettingData(132, "P 42/n b c", "P 42/n b c (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(132, "P 42/n b c", "P 42/n b c (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 42/n n m
setSettingData(133, "P 42/n n m", "P 42/n n m (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(133, "P 42/n n m", "P 42/n n m (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 42/m b c
setSettingData(134, "P 42/m b c", "P 42/m b c", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 42/m n m
setSettingData(135, "P 42/m n m", "P 42/m n m", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 42/n m c
setSettingData(136, "P 42/n m c", "P 42/n m c (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(136, "P 42/n m c", "P 42/n m c (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 42/n c m
setSettingData(137, "P 42/n c m", "P 42/n c m (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(137, "P 42/n c m", "P 42/n c m (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// I 4/m m m
setSettingData(138, "I 4/m m m", "I 4/m m m", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// I 4/m c m
setSettingData(139, "I 4/m c m", "I 4/m c m", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// I 41/a m d
setSettingData(140, "I 41/a m d", "I 41/a m d (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(140, "I 41/a m d", "I 41/a m d (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// I 41/a c d
setSettingData(141, "I 41/a c d", "I 41/a c d (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(141, "I 41/a c d", "I 41/a c d (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 3
setSettingData(142, "P 3", "P 3", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 31
setSettingData(143, "P 31", "P 31", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 32
setSettingData(144, "P 32", "P 32", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// R 3
setSettingData(145, "R 3", "R 3 (Hexagonal axes)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(145, "R 3", "R 3 (Rhombohedral axes)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P -3
setSettingData(146, "P -3", "P -3", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// R -3
setSettingData(147, "R -3", "R -3 (Hexagonal axes)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(147, "R -3", "R -3 (Rhombohedral axes)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 3 1 2
setSettingData(148, "P 3 1 2", "P 3 1 2", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 3 2 1
setSettingData(149, "P 3 2 1", "P 3 2 1", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 31 1 2
setSettingData(150, "P 31 1 2", "P 31 1 2", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 31 2 1
setSettingData(151, "P 31 2 1", "P 31 2 1", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 32 1 2
setSettingData(152, "P 32 1 2", "P 32 1 2", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 32 2 1
setSettingData(153, "P 32 2 1", "P 32 2 1", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// R 3 2
setSettingData(154, "R 3 2", "R 3 2 (Hexagonal axes)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(154, "R 3 2", "R 3 2 (Rhombohedral axes)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 3 m 1
setSettingData(155, "P 3 m 1", "P 3 m 1", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 3 1 m
setSettingData(156, "P 3 1 m", "P 3 1 m", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 3 c 1
setSettingData(157, "P 3 c 1", "P 3 c 1", new CLatticeDef(0.44445, 0.44445, 0.44445, 90, 90, 120, 0, 0, 0, 0, 0, 0), false);

// P 3 1 c
setSettingData(158, "P 3 1 c", "P 3 1 c", new CLatticeDef(0.44445, 0.44445, 0.44445, 90, 90, 120, 0, 0, 0, 0, 0, 0), false);

// R 3 m
setSettingData(159, "R 3 m", "R 3 m (Hexagonal axes)", new CLatticeDef(0.44445, 0.44445, 0.44445, 90, 90, 120, 0, 0, 0, 0, 0, 0), false);
setSettingData(159, "R 3 m", "R 3 m (Rhombohedral axes)", new CLatticeDef(0.29630, 0.29630, 0.29630, 97.1808, 97.1808, 97.1808, 0, 0, 0, 0, 0, 0), false);

// R 3 c
setSettingData(160, "R 3 c", "R 3 c (Hexagonal axes)", new CLatticeDef(0.44445, 0.44445, 0.44445, 90, 90, 120, 0, 0, 0, 0, 0, 0), false);
setSettingData(160, "R 3 c", "R 3 c (Rhombohedral axes)", new CLatticeDef(0.29630, 0.29630, 0.29630, 97.1808, 97.1808, 97.1808, 0, 0, 0, 0, 0, 0), false);

// P -3 1 m
setSettingData(161, "P -3 1 m", "P -3 1 m", new CLatticeDef(0.66667, 0.66667, 0.66667, 90, 90, 120, 0, 0, 0, 0, 0, 0), false);

// P -3 1 c
setSettingData(162, "P -3 1 c", "P -3 1 c", new CLatticeDef(0.66667, 0.66667, 0.66667, 90, 90, 120, 0, 0, 0, 0, 0, 0), false);

// P -3 m 1
setSettingData(163, "P -3 m 1", "P -3 m 1", new CLatticeDef(0.66667, 0.66667, 0.66667, 90, 90, 120, 0, 0, 0, 0, 0, 0), false);

// P -3 c 1
setSettingData(164, "P -3 c 1", "P -3 c 1", new CLatticeDef(0.66667, 0.66667, 0.66667, 90, 90, 120, 0, 0, 0, 0, 0, 0), false);

// R -3 m
setSettingData(165, " R -3 m", "R -3 m (Hexagonal axes)", new CLatticeDef(0.66667, 0.66667, 0.66667, 90, 90, 120, 0, 0, 0, 0, 0, 0), false);
setSettingData(165, " R -3 m", "R -3 m (Rhombonhedral axes)", new CLatticeDef(0.66667, 0.66667, 0.66667, 97.1808, 97.1808, 97.1808, 0, 0, 0, 0, 0, 0), false);

// R -3 c
setSettingData(166, "R -3 c", "R -3 c (Hexagonal axes)", new CLatticeDef(0.66667, 0.66667, 0.66667, 90, 90, 120, 0, 0, 0, 0, 0, 0), false);
setSettingData(166, "R -3 c", "R -3 c (Rhombohedral axes)", new CLatticeDef(0.66667, 0.66667, 0.66667, 97.1808, 97.1808, 97.1808, 0, 0, 0, 0, 0, 0), false);


// P 6
setSettingData(167, "P 6", "P 6", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 61
setSettingData(168, "P 61", "P 61", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);


// P 65
setSettingData(169, "P 65", "P 65", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 62
setSettingData(170, "P 62", "P 62", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 64
setSettingData(171, "P 64", "P 64", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 63
setSettingData(172, "P 63", "P 63", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P -6
setSettingData(173, "P -6", "P -6", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 6/m
setSettingData(174, "P 6/m", "P 6/m", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 63/m
setSettingData(175, "P 63/m", "P 63/m", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 6 2 2
setSettingData(176, "P 6 2 2", "P 6 2 2", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 61 2 2
setSettingData(177, "P 61 2 2", "P 61 2 2", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 65 2 2
setSettingData(178, "P 65 2 2", "P 65 2 2", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 62 2 2
setSettingData(179, "P 62 2 2", "P 62 2 2", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 64 2 2
setSettingData(180, "P 64 2 2", "P 64 2 2", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 63 2 2
setSettingData(181, "P 63 2 2", "P 63 2 2", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 6 m m
setSettingData(182, "P 6 m m", "P 6 m m", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 6 c c
setSettingData(183, "P 6 c c", "P 6 c c", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 63 c m
setSettingData(184, "P 63 c m", "P 63 c m", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 63 m c
setSettingData(185, "P 63 m c", "P 63 m c", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P -6 m 2
setSettingData(186, "P -6 m 2", "P -6 m 2", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P -6 c 2
setSettingData(187, "P -6 c 2", "P -6 c 2", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P -6 2 m
setSettingData(188, "P -6 2 m", "P -6 2 m", new CLatticeDef(), false);

// P -6 2 c
setSettingData(189, "P -6 2 c", "P -6 2 c", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 6/m m m
setSettingData(190, "P 6/m m m", "P 6/m m m", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 6/m c c
setSettingData(191, "P 6/m c c", "P 6/m c c", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 63/m c m
setSettingData(192, "P 63/m c m", "P 63/m c m", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 63/m m c
setSettingData(193, "P 63/m m c", "P 63/m m c", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);


// P 2 3
setSettingData(194, "P 2 3", "P 2 3", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// F 2 3
setSettingData(195, "F 2 3", "F 2 3", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);


// I 2 3
setSettingData(196, "I 2 3", "I 2 3", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 21 3
setSettingData(197, "P 21 3", "P 21 3", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// I 21 3
setSettingData(198, "I 21 3", "I 21 3", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P m -3
setSettingData(199, "P m -3", "P m -3", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P n -3
setSettingData(200, "P n -3", "P n -3 (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(200, "P n -3", "P n -3 (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// F m -3
setSettingData(201, "F m -3", "F m -3", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// F d -3 
setSettingData(202, "F d -3 ", "F d -3", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// I m -3
setSettingData(203, "I m -3", "I m -3", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P a -3
setSettingData(204, "P a -3", "P a -3", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// I a -3
setSettingData(205, "I a -3", "I a -3", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 4 3 2
setSettingData(206, "P 4 3 2", "P 4 3 2", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 42 3 2
setSettingData(207, "P 42 3 2", "P 42 3 2", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// F 4 3 2
setSettingData(208, "F 4 3 2", "F 4 3 2", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// F 41 3 2
setSettingData(209, "F 41 3 2", "F 41 3 2", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// I 4 3 2
setSettingData(210, "I 4 3 2", "I 4 3 2", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 43 3 2
setSettingData(211, " P 43 3 2", "P 43 3 2", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P 41 3 2
setSettingData(212, "P 41 3 2", "P 41 3 2", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// I 41 3 2
setSettingData(213, "I 41 3 2", "I 41 3 2", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P -4 3 m
setSettingData(214, "P -4 3 m", "P -4 3 m", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// F -4 3 m
setSettingData(215, "F -4 3 m", "F -4 3 m", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// I -4 3 m
setSettingData(216, "I -4 3 m", "I -4 3 m", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P -4 3 n
setSettingData(217, "P -4 3 n", "P -4 3 n", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// F -4 3 c
setSettingData(218, "F -4 3 c", "F -4 3 c", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// I -4 3 d
setSettingData(219, "I -4 3 d", "I -4 3 d", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P m -3 m
setSettingData(220, "P m -3 m", "P m -3 m", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P n -3 n
setSettingData(221, "P n -3 n", "P n -3 n (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(221, "P n -3 n", "P n -3 n (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P m -3 n
setSettingData(222, "P m -3 n", "P m -3 n", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// P n -3 m
setSettingData(223, "P n -3 m", "P n -3 m (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(223, "P n -3 m", "P n -3 m (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// F m -3 m
setSettingData(224, "F m -3 m", "F m -3 m", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// F m -3 c
setSettingData(225, "F m -3 c", "F m -3 c", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// F d -3 m
setSettingData(226, "F d -3 m", "F d -3 m (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(226, "F d -3 m", "F d -3 m (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// F d -3 c
setSettingData(227, "F d -3 c", "F d -3 c (Origin choice 1)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
setSettingData(227, "F d -3 c", "F d -3 c (Origin choice 2)", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// I m -3 m
setSettingData(228, "I m -3 m", "I m -3 m", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);

// I a -3 d
setSettingData(229, "I a -3 d", "I a -3 d", new CLatticeDef(1, 1, 1, 90, 90, 90, 0, 0, 0, 0, 0, 0), false);
*/