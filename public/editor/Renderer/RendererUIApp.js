import { Renderer } from './Renderer.js';
import { rendererUI } from './RendererUI.js';
import { rendererUITopMenu } from './RendererUITopMenu.js';
import { GeomRenderer } from './GeomRenderer.js';
import * as THREE from '../build/three.module.js';
import { rayLog } from '../Renderer/log.js';

// ���⿡ �޴� + �������� ������ ��ġ�Ѵ�
export class rendererUIApp {

    constructor(name, div_elem, is_portlet, is_viewer) {
        new rendererUI();

        this._version = 0.01;

        this._name = name;

        this._div = div_elem;

        this._div.innerHTML = this._appElementHTML(name);

        this._div_topMenu = document.getElementById(name + "_topMenu");
        this._div_rbase = document.getElementById(name + "_rbase");

        this._load_file = document.getElementById(name + '_load_file');

         this._topMenu = new rendererUITopMenu(this._name, this, this._div_topMenu);

        rendererUIApp.I = this;

       

        this._load_file.onchange = function (event) {
            let reader = new FileReader();
            const file = document.getElementById(rendererUIApp.I._name + '_load_file');
            const rfile = document.querySelector('input[type=file]').files[0];
            reader.onload = function () {
                fetch(reader.result)
                .then(r => r.text())
                .then(t => {
                    rendererUIApp.I._geom_renderer.clear();
                    rendererUIApp.I._geom_renderer.LoadFromString(t);
                    rendererUIApp.I._renderer.autofitCamera(rendererUIApp.I._geom_renderer._group);
                });
            };

            reader.readAsDataURL(rfile);
            file.click();
        };

        window.addEventListener('resize', function () {
            rendererUIApp.I.OnResize();
        });

        this._initApp();


        kVisLib.Init(function() {
            rendererUIApp.I._geom_renderer = new GeomRenderer(kVisLib.api, rendererUIApp.I._renderer, '../_resources/textures/point.png');
        });
    }


    _appElementHTML(name) {

        let ihtml = [], idx = 0;

        ihtml[idx] = "<div class='rendererUI_topMenu' = id='" + name + "_topMenu'></div>";
        idx++;

        ihtml[idx] = "<div class='rendererUI_base' id='" + name + "_rbase' style='float:left;overflow:hidden;'>";
        idx++;

        ihtml[idx] = "<input id='" + name + "_load_file' type='file' value='' hidden />";
        idx++;

        return ihtml.join('');
    }

    _initApp() {
        rayLog(3, "Init rendererUIApp for kVisLib");

        // set renderer
        this._renderer = new Renderer(this._div_rbase, false, true);
        // set camera and control.
        this._renderer.create3DOrthographicCamera(-100, 100, 100, -100, 0, 1000);
        this._renderer.createPerspecriveCamera(100, 100, 100, 50, 1.5, 0.1, 1000);
        this._renderer.createOrbitControl();
        
        this._renderer.setPerspectiveCamera();
        this._renderer.createCameraLight();
        this._renderer.setLightMode(0);
        this._renderer.setBackgroundColor(...rendererUI.DefaultPref.BackgroundColor);





        this._bInitApp = true;
        // UI resize init
        this.OnResize();

        // start render
        this._render();
    }

    /**
     * �����Ӹ��� �������� �ٽ� �����Ѵ�
     *
     */
    _render() {
        requestAnimationFrame(rendererUIApp.I._render);

        Renderer.I.tick();
        Renderer.I.render();
    }
    /**
 * ���Ϸκ��� �����͸� �����´�
 *
 */
    MenuFileOpen() {
        rayLog(3, "menu file open");

        this._load_file.click();
    }

    /**
 * ui�� �����Ѵ�
 * */
    UpdateUI() {
        this._topMenu.UpdateUIState();
    }

    // window handler functions

    /**
     * window resize �۾��� �����Ѵ�
     * */
    OnResize() {
        
        this._divw = window.innerWidth;
        this._divh = window.innerHeight;
        //console.log("Resize : " + this._divw + "," + this._divh);

     
        this._topBar_height = $(this._div_topMenu).height() + $(this._div_topBar).height();

        if (this._cmdBar && this._cmdBar._show)
            this._commandBar_height = $(this._div_commandBar).height();
        else
            this._commandBar_height = 0;
        
        //console.log("Topbar Height : " + this._topBar_height);

        this._div.style.width = this._divw + "px";
        this._div.style.height = this._divh + "px";

        // ��� �޴��ٿ� ��ģ ������ ��� �����Ѵ�.
        // var viewHeight = this._divh - this._topBar_height - this._commandBar_height;
        var viewHeight = this._divh - this._topBar_height;
        var viewWidth = this._divw;

        // �� �Ʒ� �� ����
        this._canvas_width = viewWidth;
        this._canvas_height = viewHeight;
        this._canvas_aspect = this._canvas_width / this._canvas_height;


        this._div_rbase.style.width = this._canvas_width + "px";
        this._div_rbase.style.height = this._canvas_height + "px";

        if (this._renderer)
            this._renderer.onWindowResize(this._canvas_width, this._canvas_height);
    }

}