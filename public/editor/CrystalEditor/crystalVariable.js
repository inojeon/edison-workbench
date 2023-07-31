export var cryst = null;

/**
 * crystal editor app 변수 및 자주 쓰이는 기능 함수 클래스
 * */
export class crystalVariable {

    /**
     * 생성자
     * 
     * 변수를 초기 설정 값으로 지정한다.
     * */
    constructor() {

        cryst = this;

        this.RestoreDefault();
    }

    /**
     * crystalVariable을 초기 설정값으로 지정한다.
     * */
    RestoreDefault() {
        this.Boundary = [];

        this.Boundary['minX'] = 0;
        this.Boundary['minY'] = 0;
        this.Boundary['minZ'] = 0;
        this.Boundary['maxX'] = 1;
        this.Boundary['maxY'] = 1;
        this.Boundary['maxZ'] = 1;

        this.Tool = {};
        this.Tool.RotationMode = 0;
        this.Tool.OrientationMode = 0;

        this.Style = {};
        this.Style.ShowModel = true;
        this.Style.ShowDotSurface = false;
        this.Style.StructuralMode = 0;

        this.Style.VolumetricSection = true;
        this.Style.VolumetricIsoSurface = false;
        this.Style.VolumetricSurfaceColor = false;
        this.Style.VolumetricMode = 0;

        this.Style.ShowCrystalShape = true;
        this.Style.CrystalMode = 0;

        this.Name = {};
        this.Name.Axis = {};
        this.Name.Axis.X = "a";
        this.Name.Axis.Y = "b";
        this.Name.Axis.Z = "c";

        this.Unitcell = {};
        this.Unitcell.a = 5;
        this.Unitcell.b = 5;
        this.Unitcell.c = 5;
        this.Unitcell.alpha = 90;
        this.Unitcell.beta = 90;
        this.Unitcell.gamma = 90;

        this.Mode = {};
        this.Mode.Boundary = 1;
        this.Mode.Search = 0;

        this.Mode.AddVector = 0;
        this.Mode.ModifyVector = 1;
        

        this.RenderOptionDefault = {};
        this.RenderOptionDefault.BackgroundColor = [1, 1, 1];
        this.RenderOptionDefault.ShowAxis = 1;
        this.RenderOptionDefault.LightingMode = 1;
        this.RenderOptionDefault.CameraType = 0;
        this.RenderOptionDefault.Antialiasing = 1;
        this.RenderOptionDefault.AtomStyle = 1;
        this.RenderOptionDefault.BondStyle = 1;

        this.StructurePropertyDefault = {};
        this.StructurePropertyDefault.UnitCell = {};
        this.StructurePropertyDefault.UnitCell.ShowLine = true;
        this.StructurePropertyDefault.UnitCell.Color = [0, 0, 0];
        this.StructurePropertyDefault.Crystal = {};
        this.StructurePropertyDefault.Crystal.ShowColor = true;
        this.StructurePropertyDefault.Crystal.ShowLine = true;
        this.StructurePropertyDefault.Atom = {};
        this.StructurePropertyDefault.Atom.Shininess = 30;
        this.StructurePropertyDefault.Atom.ShowLabel = false;
        this.StructurePropertyDefault.Bond = {};
        this.StructurePropertyDefault.Bond.Shininess = 30;
        this.StructurePropertyDefault.Bond.MeshDetail = 30;
        this.StructurePropertyDefault.Polyhedron = {};
        this.StructurePropertyDefault.Polyhedron.Shininess = 30;
        this.StructurePropertyDefault.Polyhedron.ShowLine = false;

        this.ZoomIn = 3;
        this.ZoomOut = -3;


    }

    /**
     * color array를 html hex 문자열로 바꾼다.
     * @param {Array} color 0~1 사이의 값을 원소로 갖는 길이 3짜리 rgb 배열
     * @return {String} hex color string
     */
    static HTMLColorRGB(color) {

        if (!color)
            return "000000";

        let r = Math.floor(color[0] * 255).toString(16);
        let g = Math.floor(color[1] * 255).toString(16);
        let b = Math.floor(color[2] * 255).toString(16);

        if (r.length < 2)
            r = "0" + r;
        if (g.length < 2)
            g = "0" + g;
        if (b.length < 2)
            b = "0" + b;

        return r + g + b;
    }

    /**
     * 16진법 문자열을 배열로 바꾼다.
     * @param {String} hex hex color string
     * @return {Array} color array
     */
    static HexStringtoColor(hex) {
        let r = hex.substr(0, 2);
        let g = hex.substr(2, 2);
        let b = hex.substr(4, 2);

        let color = [];

        color.push(Number("0x" + r) / 255);
        color.push(Number("0x" + g) / 255);
        color.push(Number("0x" + b) / 255);

        return color;
    }

    /**
     * color rgb값을 hex number로 바꾼다.
     * @param {Array} color color array (0~1의 값을 가짐)
     */
    static ColorRGBtoHexNum(color) {
        let r = Math.floor(color[0] * 255);
        let g = Math.floor(color[1] * 255);
        let b = Math.floor(color[2] * 255);

        let h = r * 256 * 256 + g * 256 + b;

        return h;
    }

    /**
     * 키워드 파싱
     * @param {String} txt 파싱할 문자열
     * @return {Array} 파싱된 문자열 배열
     */
    static parse(txt) {
        function nextWord() {
            end++
            start = end;
            wordCount++;
        }
        function nextLine() {
            wordCount = 0;
            let temp = {};
            Object.assign(temp, st);
            ret.push(temp);
        }
        function find(data) {
            if (txt[end] === "(") {
                st[data] = txt.slice(start, end);
                for (let spacePos = 1; spacePos < txt.length - end; spacePos++) {
                    if (txt[end + spacePos] === " ") {
                        end += spacePos;
                        break;
                    }
                }
                nextWord();
                if (data === "SOF") {
                    nextLine();
                }
            }
            else if (txt[end] === " ") {

                if (data === "name") {
                    if (txt[end - 1] >= 0 && txt[end - 1] < 10) //이름 뒤에 숫자가 있으면 한자리 수로 가정함
                        st["atom"] = txt.slice(start, end - 1);
                    else
                        st["atom"] = txt.slice(start, end);
                }
                st[data] = txt.slice(start, end);
                nextWord();
                if (data === "SOF") {
                    nextLine();
                }
            }
        }

        let ret = [];
        let end = 1
        let start = 0;
        let wordCount = 0;
        let st = [];
        for (; end < txt.length; end++) {

            if (wordCount === 0)
                find("name"); //atom, name 받음        
            else if (wordCount === 1)
                find("item");
            else if (wordCount === 2)
                find("a");
            else if (wordCount === 3)
                find("b");
            else if (wordCount === 4)
                find("c");
            else if (wordCount === 5)
                find("u");
            else if (wordCount === 6)
                find("SOF");
        }
        return ret;
    }

}