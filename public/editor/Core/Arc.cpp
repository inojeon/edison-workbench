#include "pch.h"

namespace RayCad{


    Arc::Arc() : Geom() {
        _type = Geom::G_ARC;
    }


    void Arc::Set(cad_type x, cad_type y, cad_type z, cad_type radius, cad_type angle_start, cad_type angle_end)
    {
        _center.Set(x, y, z);

        _radius = radius;
        _angle_st = angle_start;
        _angle_ed = angle_end;
    }
    	

	double Arc::distance2(double x, double y){
        return 0;
    }


    double Arc::distance3(double x, double y, double z){
        return 0;
    }


    shared_ptr<Geom> Arc::Clone()
    {
        auto cc = std::shared_ptr<Arc>(new Arc());
        cc->_id = _id;
        cc->_type = _type;
        cc->_center = _center;
        cc->_radius = _radius;

        cc->_angle_st = _angle_st;
        cc->_angle_ed = _angle_ed;
        
        return cc;
    }

	/// <summary>
	/// 기하 오브젝트의 타입명을 반환한다.
	/// </summary>
	/// <returns>기하 오브젝트 타입명</returns>
	std::string Arc::GetTypeName(){
        return "Arc";
    }

    bool Arc::ToBinary(MemoryBlock* data, int& ptr)
    {
        int size = this->GetBinarySize(true);

        data->Write4(ptr, &size);
        data->Write2(ptr, &_type);
        data->Write4(ptr, &_id);

        data->Write8(ptr, &_center._x);
        data->Write8(ptr, &_center._y);
        data->Write8(ptr, &_center._z);


        data->Write8(ptr, &_radius);
        data->Write8(ptr, &_angle_st);
        data->Write8(ptr, &_angle_ed);

        if (_tag != nullptr) {
            string tag = this->_tag->ToString();
            if (tag != "")
            {
                data->Write(ptr, &(tag[0]), tag.size() + 1);
            }
        }

        return true;
    }

    int Arc::GetBinarySize(bool bIncludeTag)
    {
        if (bIncludeTag && _tag != nullptr){
            string tag = this->_tag->ToString();
            if(tag != "")
                return 58 + tag.size() + 1;
        }
        return 58;
    }


    /// <summary>
    /// 프리뷰 렌더링을 할 오브젝트 생성
    /// </summary>
    /// <param name="preview">프리뷰 렌더링 오브젝트를 저장할 변수</param>
    /// <returns>성공 여부</returns>
    bool Arc::GeneratePreview(shared_ptr<Group> preview) {
        int n = 200;
        auto res = make_shared<PLine>();
        res->Init(n);
        res->SetID(0);

        double angleDiff = this->_angle_ed - this->_angle_st;

        for (int i = 0; i < n-1; i++)
        {
            double degree = i * (angleDiff / (double)(n-1)) + this->_angle_st;
            double radian = (degree / 180.0) * ((double)M_PI);

            double x, y;
            x = cos(radian) * _radius + _center._x;
            y = sin(radian) * _radius + _center._y;

            res->SetPoint(i, x, y, 0);
        }
        
        double radian = (this->_angle_ed / 180.0) * (double)M_PI;
        double x = cos(radian) * _radius + _center._x;
        double y = sin(radian) * _radius + _center._y;
        res->SetPoint(n - 1, x, y, 0);

        int ret = preview->Add(res);

        if (ret < 0)
            return false;
        return true;
    }

    void Arc::GetAuxUIPoints(shared_ptr<PointList> plist)
    {
        Arc* a = (Arc*)this;
        auto center = a->GetCenter();
        plist->AddPoint(center._x, center._y, center._z);
        auto start = a->GetStart();
        plist->AddPoint(start._x, start._y, start._z);
        auto end = a->GetEnd();
        plist->AddPoint(end._x, end._y, end._z);
    }


    cad_type Arc::GetRadius() {
        return _radius;
    }

    cad_type Arc::GetAngleStart()
    {
        return _angle_st;
    }

    cad_type Arc::GetAngleEnd()
    {
        return _angle_ed;
    }

    cad_type Arc::GetX()
    {
        return _center._x;
    }

    cad_type Arc::GetY()
    {
        return _center._y;
    }

    cad_type Arc::GetZ()
    {
        return _center._z;
    }

    Vector3 Arc::GetCenter(){
        return _center;
    }


    Vector3 Arc::GetStart() {
        Vector3 s;
        double radian = (this->_angle_st / 180.0) * ((double)M_PI);
        s._x = cos(radian) * _radius + _center._x;
        s._y = sin(radian) * _radius + _center._y;
        s._z = 0;
        return s;
    }


    Vector3 Arc::GetEnd() {
        Vector3 e;
        double radian = (this->_angle_ed / 180.0) * ((double)M_PI);
        e._x = cos(radian) * _radius + _center._x;
        e._y = sin(radian) * _radius + _center._y;
        e._z = 0;
        return e;
    }


#ifndef _CPP

    EMSCRIPTEN_BINDINGS(raycad_arc) {
        class_<RayCad::Arc, base<Geom>>("Arc")
            .smart_ptr_constructor("Arc", &std::make_shared<Arc>)

            .function("GetTypeName", &RayCad::Arc::GetTypeName)
            .function("Clone", &RayCad::Arc::Clone)

            .function("distance2", &RayCad::Arc::distance2)
            .function("distance3", &RayCad::Arc::distance3)

             //.function("AddCommand", &RayCad::Arc::AddCommand)

            .function("GeneratePreview", &RayCad::Arc::GeneratePreview)
            .function("GetAuxUIPoints", &RayCad::Arc::GetAuxUIPoints)

            .function("Set", &RayCad::Arc::Set)
            .function("GetX", &RayCad::Arc::GetX)
            .function("GetY", &RayCad::Arc::GetY)
            .function("GetZ", &RayCad::Arc::GetZ)
            .function("GetRadius", &RayCad::Arc::GetRadius)
            .function("GetAngleStart", &RayCad::Arc::GetAngleStart)
            .function("GetAngleEnd", &RayCad::Arc::GetAngleEnd)
            .function("GetBinarySize", &RayCad::Arc::GetBinarySize)
            ;
    }

#endif
}