import * as THREE from '../build/three.module.js';

// 2d cad 용 grid mesh 생성 함수

/**
 * 2d cad 용 grid mesh 생성 함수
 * */
export class GridLayout {

    /**
     * grid layout의 변수 설정
     * @param {THREE.Scene} scene_root 3. scene grid root
     * @param {Number} start_x 시작 x 좌표
     * @param {Number} start_y 시작 y 좌표
     * @param {Number} end_x 종료 x 좌표
     * @param {Number} end_y 종료 y 좌표
     * @param {Number} delta_x x 간격
     * @param {Number} delta_y y 간격
     * @param {Number} snap_limit 피킹 limit
     * @param {Number} r red
     * @param {Number} g green
     * @param {Number} b blue
     */
    constructor(scene_root, start_x, start_y, end_x, end_y, delta_x, delta_y, snap_limit, r, g, b) {
        this._scene_root = scene_root;
        this._start_x = start_x * 2;
        this._start_y = start_y * 2;
        this._end_x = end_x * 2;
        this._end_y = end_y * 2;
        this._delta_x = delta_x;        // 피킹 체크를 위한 x 격자 간격
        this._delta_y = delta_y;        // 피킹 체크를 위한 y 격자 간격
        this._snap_limit = snap_limit;  // 피킹 범위에 들기 위한 제한 거리
        this._grid = [null, null];
        this._r = r;
        this._g = g;
        this._b = b;
        this._visible = false;

        // for UCS extension
        this._ucsX = new THREE.Vector3(2, 4, 0);
        this._ucsY = new THREE.Vector3(0, 3, 5);
        this._ucsOrigin = new THREE.Vector3(30, 20, 0);
    }

    // start : 좌하단 좌표, end : 우상단 좌표
    /**
     * Grid를 생성한다
     * */
    GenGrid () {
        
        const color_material = new THREE.Color(this._r, this._g, this._b);
        var horizontalPoints = [], verticalPoints = [];
        var horizontalShape, verticalShape;		
        var horizontalGeometry, verticalGeometry;
        var horizontalLine, verticalLine; 	// 가로,세로 선
        var iterHorizontal, iterVertical;	// 선 긋기 반복 횟수

        var diff, cnt;                           // 0,0을 지나가기 위해 보정하는 값
        if( !Number.isInteger(this._start_x / this._delta_x) || !Number.isInteger(this._start_y/this._delta_y) ||
        !Number.isInteger(this._end_x / this._delta_x) || !Number.isInteger(this._end_y / this._delta_y)){
                
                if (!Number.isInteger(this._start_x / this._delta_x)) {
                    cnt = 0;
                    if(this._start_x < 0)
                    {
                        while(this._start_x + this._delta_x * cnt < 0)
                            cnt += 1;
                        cnt -= 1;
                        diff = this._start_x + this._delta_x * cnt;
                        this._start_x -= diff;
                    }
                }

                if (!Number.isInteger(this._start_y / this._delta_y)) {
                    cnt = 0;
                    if(this._start_y < 0)
                    {
                        while(this._start_y + this._delta_y * cnt < 0)
                            cnt += 1;
                        cnt -= 1;
                        diff = this._start_y + this._delta_y * cnt;
                        this._start_y -= diff;
                    }
                }

                if (!Number.isInteger(this._end_x / this._delta_x)) {
                    cnt = 0;
                    if(this._end_x > 0)
                    {
                        while(this._end_x - this._delta_x * cnt > 0)
                            cnt += 1;
                        cnt -= 1;
                        diff = this._end_x - this._delta_x * cnt;
                        this._end_x -= diff;
                    }
                }

                if (!Number.isInteger(this._end_y / this._delta_y)) {
                    cnt = 0;
                    if(this._end_y > 0)
                    {
                        while(this._end_y - this._delta_y * cnt > 0)
                            cnt += 1;
                        cnt -= 1;
                        diff = this._end_y - this._delta_y * cnt;
                        this._end_y -= diff;
                    }
                }
        }

        iterVertical = (this._end_x - this._start_x) / this._delta_x;
        iterHorizontal = (this._end_y - this._start_y) / this._delta_y;


        var bEven = false;
        for (var i=0; i<=iterVertical; i++) {
            // 위에서 아래로
            if(bEven) {
                verticalPoints.push(this._ucsX.clone().multiplyScalar(this._start_x + this._delta_x * i).add(this._ucsY.clone().multiplyScalar(this._end_y)).add(this._ucsOrigin));
                verticalPoints.push(this._ucsX.clone().multiplyScalar(this._start_x + this._delta_x * i).add(this._ucsY.clone().multiplyScalar(this._start_y)).add(this._ucsOrigin));
                // verticalPoints.push(new THREE.Vector3(this._start_x + this._delta_x * i, this._end_y, 0));
                // verticalPoints.push(new THREE.Vector3(this._start_x + this._delta_x * i, this._start_y, 0));
            }
            // 아래에서 위로 
            else {
                verticalPoints.push(this._ucsX.clone().multiplyScalar(this._start_x + this._delta_x * i).add(this._ucsY.clone().multiplyScalar(this._start_y)).add(this._ucsOrigin));
                verticalPoints.push(this._ucsX.clone().multiplyScalar(this._start_x + this._delta_x * i).add(this._ucsY.clone().multiplyScalar(this._end_y)).add(this._ucsOrigin));
                // verticalPoints.push(new THREE.Vector3(this._start_x + this._delta_x * i, this._start_y, 0));
                // verticalPoints.push(new THREE.Vector3(this._start_x + this._delta_x * i, this._end_y, 0));
            }
            bEven = !bEven;
        }

        bEven = false;
        for (i=0; i<=iterHorizontal; i++) {
            if(bEven) {
                horizontalPoints.push(this._ucsY.clone().multiplyScalar(this._end_y - this._delta_y * i).add(this._ucsX.clone().multiplyScalar(this._start_x)).add(this._ucsOrigin));
                horizontalPoints.push(this._ucsY.clone().multiplyScalar(this._end_y - this._delta_y * i).add(this._ucsX.clone().multiplyScalar(this._end_x)).add(this._ucsOrigin));
                // horizontalPoints.push(new THREE.Vector3(this._start_x, this._end_y - this._delta_y * i, 0));
                // horizontalPoints.push(new THREE.Vector3(this._end_x, this._end_y - this._delta_y * i, 0));
            }
            else {
                horizontalPoints.push(this._ucsY.clone().multiplyScalar(this._end_y - this._delta_y * i).add(this._ucsX.clone().multiplyScalar(this._end_x)).add(this._ucsOrigin));
                horizontalPoints.push(this._ucsY.clone().multiplyScalar(this._end_y - this._delta_y * i).add(this._ucsX.clone().multiplyScalar(this._start_x)).add(this._ucsOrigin));
                // horizontalPoints.push(new THREE.Vector3(this._end_x, this._end_y - this._delta_y * i, 0));
                // horizontalPoints.push(new THREE.Vector3(this._start_x, this._end_y - this._delta_y * i, 0));
            }
            bEven = !bEven;
        }

        /*
        if (horizontalPoints.length === 0) {
            horizontalPoints.push(new THREE.Vector3(-1000, -1000, -1000));
        }
        if (verticalPoints.length === 0) {
            verticalPoints.push(new THREE.Vector3(-1000, -1000, -1000));
        }
        */

        horizontalShape = new THREE.BufferGeometry();
        verticalShape = new THREE.BufferGeometry();

        horizontalGeometry = horizontalShape.setFromPoints(horizontalPoints);
        verticalGeometry = verticalShape.setFromPoints(verticalPoints);

        horizontalLine = new THREE.Line(horizontalGeometry, new THREE.LineBasicMaterial({color: color_material}));
        verticalLine = new THREE.Line(verticalGeometry, new THREE.LineBasicMaterial({color: color_material}));
        
        return [horizontalLine, verticalLine];
    }

    // 좌표와 가까운 지점 반환 (snap_limit이 존재해야함)
    /**
     * 좌표와 가까운 지점을 반환한다
     * @param {Point} pt point
     * @param {Number} limit snap limit
     */
    GetGridSnap(pt, limit) {

        if (limit)
            this._snap_limit = limit;

        let x = pt.x;
        let y = pt.y;
        let z = pt.z;

        let res = this.CalcGridPoint(pt);
        res[0] = Math.round(res[0]/ this._delta_x) * this._delta_x;
        res[1] = Math.round(res[1]/ this._delta_x) * this._delta_x;

        // origin + res[0] * ucsX + res[1] * ucsY 와 pt와의 거리를 계산한다.
        let grid_pt = this._ucsOrigin.clone().add(this._ucsX.clone().multiplyScalar(res[0])).add(this._ucsY.clone().multiplyScalar(res[1]));

        // limit 보다 계산한 거리가 작으면 snap 포인트 반환
        let dist = grid_pt.distanceTo(pt);
        if(dist < limit)
            return grid_pt;
        // 아니면 null 반환
        return null;

        /*
        var snap_x = 0, snap_y = 0, snap_z = 0, pos = 0;
        var bMinus = false;

        if (x < 0) {
            bMinus = true;
        } else {
            bMinus = false;
        }
        pos = 0;

        if (bMinus) {
            while (-this._delta_x * (pos + 1) > x) pos += 1;

            if(Math.abs(this._delta_x * pos + x) < Math.abs(this._delta_x * (pos+1) + x)) {
                snap_x = -(this._delta_x * (pos));
            } else {
                snap_x = -(this._delta_x * (pos + 1));
            }

            if (x > -this._delta_x / 2) snap_x = 0;
        }
        else {
            while (this._delta_x * (pos + 1) < x) pos += 1;

            if(Math.abs(this._delta_x * pos - x) < Math.abs(this._delta_x * (pos+1) - x)) {
                snap_x = this._delta_x * pos;
            } else {
                snap_x = this._delta_x * (pos + 1);
            }

            if (x < this._delta_x / 2) snap_x = 0;
        }


        if (y < 0) {
            bMinus = true;
        } else {
            bMinus = false;
        }
        pos = 0;

        if (bMinus) {
            while (-this._delta_y * (pos + 1) > y) pos += 1;

            if(Math.abs(this._delta_y * pos + y) < Math.abs(this._delta_y * (pos+1) + y)) {
                snap_y = -(this._delta_y * (pos));
            } else {
                snap_y = -(this._delta_y * (pos + 1));
            }

            if (y > -this._delta_y / 2) snap_y = 0;
        }
        else {
            while (this._delta_y * (pos + 1) < y) pos += 1;

            if(Math.abs(this._delta_y * pos - y) < Math.abs(this._delta_y * (pos+1) - y)) {
                snap_y = this._delta_y * pos;
            } else {
                snap_y = this._delta_y * (pos + 1);
            }

            if (y < this._delta_y / 2) snap_y = 0;
        }

        if(Math.sqrt(Math.pow(snap_x-x, 2) + Math.pow(snap_y-y, 2)) < this._snap_limit) {
            return new THREE.Vector3(snap_x, snap_y, 0);
        }


        if (z < 0) {
            bMinus = true;
        } else {
            bMinus = false;
        }
        pos = 0;

        if (bMinus) {
            while (-this._delta_z * (pos + 1) > z) pos += 1;

            if(Math.abs(this._delta_z * pos + z) < Math.abs(this._delta_z * (pos+1) + z)) {
                snap_z = -(this._delta_z * (pos));
            } else {
                snap_z = -(this._delta_z * (pos + 1));
            }

            if (z > -this._delta_z / 2) snap_z = 0;
        }
        else {
            while (this._delta_z * (pos + 1) < z) pos += 1;

            if(Math.abs(this._delta_z * pos - z) < Math.abs(this._delta_z * (pos+1) - z)) {
                snap_z = this._delta_z * pos;
            } else {
                snap_z = this._delta_z * (pos + 1);
            }

            if (z < this._delta_z / 2) snap_z = 0;
        }

        if(Math.sqrt(Math.pow(snap_x-x, 2) + Math.pow(snap_y-y, 2) + Math.pow(snap_z-z, 2)) < this._snap_limit) {
            return new THREE.Vector3(snap_x, snap_y, snap_z);
        }

        return null;
        */
    }

    /**
     * grid를 scene에 부착한다
     * */
    AttachGrid() {
        this._grid = this.GenGrid(this._delta_x, this._delta_y);
        this._scene_root.attach(this._grid[0]);
        this._scene_root.attach(this._grid[1]);
    }

    /**
     * grid를 scene에서 제거한다
     * */
    DetachGrid() {
        if (this._grid[0])
            this._scene_root.remove(this._grid[0]);
        if (this._grid[1])
            this._scene_root.remove(this._grid[1]);
    }

    /**
     * grid를 scene에서 제거한 뒤 다시 부착한다
     * */
    RebuildGrid() {
        this.DetachGrid();
        this.AttachGrid();
    }

    /**
     * grid의 가시화 여부를 설정한다
     * @param {Boolean} bVisible 가시화 여부
     */
    SetVisible(bVisible) {
        if (bVisible === this._visible)
            return;
        
        else {
            if (bVisible === true) {
                this._visible = bVisible;
                this.AttachGrid();
            }

            else if (bVisible === false) {
                this._visible = bVisible;
                this.DetachGrid();
            }
        }
    }

    /**
     * 가시화 여부를 반환한다
     * */
    GetVisible() {
        return this._visible;
    }

    /**
     * x 간격을 설정한다
     * @param {Number} delta_x x 간격
     */
    SetDeltaX(delta_x) {
        this._delta_x = delta_x;
    }
    /**
    * y 간격을 설정한다
    * @param {Number} delta_y y 간격
    */
    SetDeltaY(delta_y) {
        this._delta_y = delta_y;
    }

    /**
     * x 시작 위치를 설정한다
     * @param {Number} start_x x 시작 위치
     */
    SetStartX(start_x) {
        this._start_x = start_x;
    }

    /**
     * y 시작 위치를 설정한다
     * @param {Number} start_y y 시작 위치
     */
    SetStartY(start_y) {
        this._start_y = start_y;
    }

    /**
     * x 종료 위치를 설정한다
     * @param {Number} end_x x 종료 위치
     */
    SetEndX(end_x) {
        this._end_x = end_x;
    }

    /**
     * y 종료 위치를 설정한다
     * @param {Number} end_y y 종료 위치
     */
    SetEndY(end_y) {
        this._end_y = end_y;
    }

    /**
     * 색상을 설정한다
     * @param {Number} r red
     * @param {Number} g green 
     * @param {Number} b blue
     */
    SetColor(r,g,b) {
        this._r = r;
        this._g = g;
        this._b = b;
    }

    /**
     * x 간격 반환
     * */
    GetDeltaX() {
        return this._delta_x;
    }

    /**
     * y 간격 반환
     * */
    GetDeltaY() {
        return this._delta_y;
    }

    /**
     * 시작 x 반환
     * */
    GetStartX() {
        return this._start_x;
    }

    /**
     * 시작 y 반환
     * */
    GetStartY() {
        return this._start_y;
    }

    /**
     * 종료 x 반환
     * */
    GetEndX() {
        return this._end_x;
    }

    /**
     * 종료 y 반환
     * */
    GetEndY() {
        return this._end_y;
    }

    /**
     * color 반환
     * */
    GetColor() {
        return [this._r, this._g, this._b];
    }

    /**
     * 주어진 좌표에 맞게 grid 범위를 조정한다
     * @param {Number} minx 최소 x 좌표
     * @param {Number} miny 최소 y 좌표
     * @param {Number} maxx 최대 x 좌표
     * @param {Number} maxy 최대 y 좌표
     */
    SetFitRegion(minx, miny, maxx, maxy) {

        const ctx = (minx + maxx) * 0.5;
        const cty = (miny + maxy) * 0.5;
        const w = Math.abs(maxx - minx);
        const h = Math.abs(maxy - miny);

        const dx = Math.floor(w / 20.0);
        //const dy = h / 100.0;

        this.SetRegionAndDelta(ctx - w * 2, cty - h * 2, ctx + w * 2, cty + h * 2, dx, dx);
    }

    /**
     * 주어진 값에 따라 grid 영역과 간격을 조정한다
     * @param {Number} minx 최소 x 좌표
     * @param {Number} miny 최소 y 좌표
     * @param {Number} maxx 최대 x 좌표
     * @param {Number} maxy 최대 y 좌표
     * @param {Number} dx x offset 간격
     * @param {Number} dy y offset 간격
     */
    SetRegionAndDelta(minx, miny, maxx, maxy, dx, dy) {

        this.SetStartX(minx);
        this.SetEndX(maxx);
        this.SetStartY(miny);
        this.SetEndY(maxy);

        this.SetDeltaX(dx);
        this.SetDeltaY(dx);

        this.RebuildGrid();
    }

    /**
     * 스냅 점을 생성하여 추가한다.
     * @param {any} plist
     */
    AddSnapPoints(plist) {
    }



    /**
     * UCS 좌표계에 맞춰 그리드를 업데이트한다.
     * @param {Number} ux UCS x 벡터
     * @param {Number} uy UCS y 벡터
     * @param {Number} origin UCS 원점
    */
    SetUCS(ucs) {

        this._ucsX = ucs.GetX().clone();
        this._ucsY = ucs.GetY().clone();
        this._ucsOrigin = ucs.GetOrigin().clone();

        // rebuild grid job here.
        this.RebuildGrid();

    }

    /**
     * 그리드 점을 재계산한다.
     *
     * @param {*} pt
     * @return {*} 
     */
    CalcGridPoint(pt) {
        if(!(this._ucsOrigin && this._ucsX && this._ucsY)) {
            return null;
        }

        let pt_origin = pt.clone().sub(this._ucsOrigin);
        let X, Y;
        // 1번 식
        // this._ucsX.x * X + this._ucsY.x * Y = pt_origin.x;

        // 2번 식
        // this._ucsX.y * X + this._ucsY.y * Y = pt_origin.y;

        // 3번 식
        // this._ucsX.z * X + this._ucsY.z * Y = pt_origin.z;

        // 미지수는 X,Y
        // 1번 식 * this._ucsX.x - 2번 식 * this._ucsY.x => X 미지수가 사라지므로 Y를 구할 수 있다.
        // this._ucsY.x * Y * this._ucsX.x - this._ucsY.y * Y * this._ucsY.x = pt_origin.x * this._ucsX.x - pt_origin.y * this._ucsY.x;
        // 따라서 Y는 아래와 같이 표현 가능하다.
        // let Y = (pt_origin.x * this._ucsX.x - pt_origin.y * this._ucsY.x) / (this._ucsY.x * this._ucsX.x - this._ucsY.y * this._ucsY.x);
        
        // Y를 구했으니 1,2,3번 식 중 아무 식에나 Y를 대입하여 X를 구할 수 있다.
        // let X = (pt_origin.x - this._ucsY.x * Y) / this._ucsX.x;

        // 모든 경우에 대해 성립하기를 원한다면 나눗셈 연산 과정 중 0이 되면 안된다는 것을 명심해야 한다. 또한 인자로 넘어온 pt값이 ucs 평면 상에 존재해야만 정확한 값을 얻을 수 있다.
        // + 나누는 과정에서 오차가 발생해 ucs 평면 상의 (x,y) 값이 나오지 않을 가능성이 있지만 picking 포인트는 대략적인 거리를 계산하는 것이므로 상관없다.
        
        /*
        Y를 구할 수 있는 경우
        1번 식 * this._ucsX.y - 2번 식 * this._ucsX.x
        2번 식 * this._ucsX.z - 3번 식 * this._ucsX.y
        1번 식 * this._ucsX.z - 3번 식 * this._ucsX.x
        let Y = (pt_origin.x * this._ucsX.y - pt_origin.y * this._ucsX.x) / (this._ucsY.x * this._ucsX.y - this._ucsY.y * this._ucsX.x);
        let Y = (pt_origin.y * this._ucsX.z - pt_origin.z * this._ucsX.y) / (this._ucsY.y * this._ucsX.z - this._ucsY.z * this._ucsX.y);
        let Y = (pt_origin.x * this._ucsX.z - pt_origin.z * this._ucsX.x) / (this._ucsY.x * this._ucsX.z - this._ucsY.z * this._ucsX.x);

        X를 구할 수 있는 경우
        1번 식 * this._ucsY.y - 2번 식 * this._ucsY.x
        2번 식 * this._ucsY.z - 3번 식 * this._ucsY.y
        1번 식 * this._ucsY.z - 3번 식 * this._ucsY.x
        let X = (pt_origin.x * this._ucsY.y - pt_origin.y * this._ucsY.x) / (this._ucsX.x * this._ucsY.y - this._ucsX.y * this._ucsY.x);
        let X = (pt_origin.y * this._ucsY.z - pt_origin.z * this._ucsY.y) / (this._ucsX.y * this._ucsY.z - this._ucsX.z * this._ucsY.y);
        let X = (pt_origin.x * this._ucsY.z - pt_origin.z * this._ucsY.x) / (this._ucsX.x * this._ucsY.z - this._ucsX.z * this._ucsY.x);
        */

        let y1 = (pt_origin.x * this._ucsX.y - pt_origin.y * this._ucsX.x) / (this._ucsY.x * this._ucsX.y - this._ucsY.y * this._ucsX.x);
        let y2 = (pt_origin.y * this._ucsX.z - pt_origin.z * this._ucsX.y) / (this._ucsY.y * this._ucsX.z - this._ucsY.z * this._ucsX.y);
        let y3 = (pt_origin.x * this._ucsX.z - pt_origin.z * this._ucsX.x) / (this._ucsY.x * this._ucsX.z - this._ucsY.z * this._ucsX.x);
        if(!isNaN(y1))
            Y = y1;
        else if(!isNaN(y2))
            Y = y2;
        else if(!isNaN(y3))
            Y = y3;

        let x1 = (pt_origin.x * this._ucsY.y - pt_origin.y * this._ucsY.x) / (this._ucsX.x * this._ucsY.y - this._ucsX.y * this._ucsY.x);
        let x2 = (pt_origin.y * this._ucsY.z - pt_origin.z * this._ucsY.y) / (this._ucsX.y * this._ucsY.z - this._ucsX.z * this._ucsY.y);
        let x3 = (pt_origin.x * this._ucsY.z - pt_origin.z * this._ucsY.x) / (this._ucsX.x * this._ucsY.z - this._ucsX.z * this._ucsY.x);
        if(!isNaN(x1))
            X = x1;
        else if(!isNaN(x2))
            X = x2;
        else if(!isNaN(x3))
            X = x3;
        /*
        if(Math.abs((this._ucsX.x * this._ucsY.y - this._ucsX.y * this._ucsY.x)) < Math.abs((this._ucsX.y * this._ucsY.z - this._ucsX.z * this._ucsY.y))) {
            if(Math.abs((this._ucsX.y * this._ucsY.z - this._ucsX.z * this._ucsY.y)) < Math.abs((this._ucsX.x * this._ucsY.z - this._ucsX.z * this._ucsY.x))) {
                X = (pt_origin.x * this._ucsY.z - pt_origin.z * this._ucsY.x) / (this._ucsX.x * this._ucsY.z - this._ucsX.z * this._ucsY.x);
            }
            else {
                X = (pt_origin.y * this._ucsY.z - pt_origin.z * this._ucsY.y) / (this._ucsX.y * this._ucsY.z - this._ucsX.z * this._ucsY.y);
            }
        }
        else {
            if(Math.abs((this._ucsX.x * this._ucsY.y - this._ucsX.y * this._ucsY.x)) < Math.abs((this._ucsX.x * this._ucsY.z - this._ucsX.z * this._ucsY.x)))
                X = (pt_origin.x * this._ucsY.z - pt_origin.z * this._ucsY.x) / (this._ucsX.x * this._ucsY.z - this._ucsX.z * this._ucsY.x);
            else
                X = (pt_origin.x * this._ucsY.y - pt_origin.y * this._ucsY.x) / (this._ucsX.x * this._ucsY.y - this._ucsX.y * this._ucsY.x);
        }
        */

        return [X,Y];

    }  
    
}