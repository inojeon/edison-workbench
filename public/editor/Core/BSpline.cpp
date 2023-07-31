#include "pch.h"


namespace RayCad {


	BSpline::BSpline() {
        _type = 0;

		_p1.Set(0, 0, 0);
		_p2.Set(0, 0, 0);
		_p3.Set(0, 0, 0);
		_p4.Set(0, 0, 0);
	}

    BSpline::BSpline(int type, Vector3 p1, Vector3 p2, Vector3 p3, Vector3 p4) {
        Set(p1, p2, p3, p4);
    }

	void BSpline::Set(Vector3 p1, Vector3 p2, Vector3 p3, Vector3 p4) {
		_p1 = p1;
		_p2 = p2;
		_p3 = p3;
		_p4 = p4;

        

        _tkt.clear();
        _tkt.push_back(-1);
        _tkt.push_back(0);
        _tkt.push_back(1);
        _tkt.push_back(2);

        _tkx.clear();
        _tkx.push_back(p1._x);
        _tkx.push_back(p2._x);
        _tkx.push_back(p3._x);
        _tkx.push_back(p4._x);

        _tky.clear();
        _tky.push_back(p1._y);
        _tky.push_back(p2._y);
        _tky.push_back(p3._y);
        _tky.push_back(p4._y);


        _tkspX.set_points(_tkt, _tkx);
        _tkspY.set_points(_tkt, _tky);
	}

    void BSpline::Calc() {
        _tkspX.set_points(_tkt, _tkx);
        _tkspY.set_points(_tkt, _tky);
    }


    Vector3 BSpline::GetBS(double t) {
        const double t2 = t * t;
        const double t3 = t2 * t;
        const double mt = 1.0 - t;
        const double mt3 = mt * mt * mt;

        const double bi3 = mt3;
        const double bi2 = 3 * t3 - 6 * t2 + 4;
        const double bi1 = -3 * t3 + 3 * t2 + 3 * t + 1;
        const double bi = t3;

        Vector3 result;

        result._x = _p1._x * bi3 +
            _p2._x * bi2 +
            _p3._x * bi1 +
            _p4._x * bi;
        result._x /= 6.0;

        result._y = _p1._y * bi3 +
            _p2._y * bi2 +
            _p3._y * bi1 +
            _p4._y * bi;
        result._y /= 6.0;

        result._z = _p1._z * bi3 +
            _p2._z * bi2 +
            _p3._z * bi1 +
            _p4._z * bi;
        result._z /= 6.0;

        return result;

    }

    void BSpline::AddPoint(int t, double x, double y, double z) {
        int tt = (t + 1);
        while (tt > _tkx.size()) {
            _tkx.push_back(0);
        }
        while (tt > _tky.size()) {
            _tky.push_back(0);
        }
        while (tt > _tkt.size()) {
            _tkt.push_back(0);
        }

        _tkt[t] = t;
        _tkx[t ] = x;
        _tky[t ] = y;
    }

    Vector3 BSpline::GetTK(double t) {
        Vector3 pos;

        pos._x = (_tkspX)(t);
        pos._y = (_tkspY)(t);
        pos._z = 0;

        return pos;

    }

	Vector3 BSpline::Get(double t) {
        switch (_type) {
        case 0:
            return GetBS(t);

        case 1:
            return GetTK(t);
        }
        return Vector3(0, 0, 0);
	}


}