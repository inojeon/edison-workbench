#include "pch.h"

namespace RayCad {

	Dim::Dim() : Geom() {
		_type = Geom::G_DIM;
		_dimType = Dim::DIM_LENGTH;
		_message = "0";
		_fontWidth = 1;
		_fontHeight = 1;

		_preview = make_shared<Group>();
	}


	void Dim::SetRefID(int id)
	{
		_refID = id;
	}

	int Dim::GetRefID()
	{
		return _refID;
	}

	int Dim::GetRefType()
	{
		return _refType;
	}

	void Dim::SetPoint(int index, double x, double y, double z)
	{
		if (index == 0)
			_p1 = Vector3(x, y, z);
		else if (index == 1)
			_p2 = Vector3(x, y, z);
		else if (index == 2)
			_p3 = Vector3(x, y, z);
	}

	void Dim::SetMsg(string msg)
	{
		_message = msg;
	}

	void Dim::SetRadius(double radius)
	{
		_radius = radius;
	}

	void Dim::SetFont(double width, double height)
	{
		_fontWidth = width;
		_fontHeight = height;
	}

	void Dim::SetOffset(cad_type offset)
	{
		_offset = offset;
	}

	void Dim::SetAngle(cad_type angle)
	{
		_angle = angle;
	}

	void Dim::SetRefType(int refType)
	{
		_refType = refType;
	}

	void Dim::SetDimType(int dimType)
	{
		_dimType = dimType;
	}

	void Dim::Set(std::shared_ptr<Geom> pGeom, int type, cad_type offset, cad_type ex_length, cad_type ex_angle)
	{
		if (type == Dim::DIM_LENGTH)
			SetDimLength(pGeom, offset);
		else if (type == Dim::DIM_ANGLE)
			SetDimAngle(pGeom, offset);
		else if (type == Dim::DIM_DIAMETER)
			SetDimDiameter(pGeom, ex_length, ex_angle);
		else if (type == Dim::DIM_RADIUS)
			SetDimRadius(pGeom, ex_length, ex_angle);
		else
			SetDimLength(pGeom, offset);
	}

	void Dim::SetLength(cad_type p1x, cad_type p1y, cad_type p2x, cad_type p2y, cad_type offset) {
		_p1.Set(p1x, p1y, 0);
		_p2.Set(p2x, p2y, 0);

		_offset = offset;
		_dimType = 0;

	}

	void Dim::SetAngle(cad_type p1x, cad_type p1y, cad_type p2x, cad_type p2y, cad_type p3x, cad_type p3y, cad_type offset) {
		_p1.Set(p1x, p1y, 0);
		_p2.Set(p2x, p2y, 0);
		_p3.Set(p3x, p3y, 0);

		_offset = offset;

		_dimType = 1;
	}

	void Dim::SetDiameter(cad_type p1x, cad_type p1y, cad_type p2x, cad_type p2y, cad_type p3x, cad_type p3y, cad_type ex_len, cad_type ex_angle)
	{
		_p1.Set(p1x, p1y, 0);
		_p2.Set(p2x, p2y, 0);

		double radius = (_p2 - _p1).Length();

		Vector3d p1(_p1._x, _p1._y, _p1._z);
		Vector3d v1(cos(ex_angle), sin(ex_angle), 0);

		Vector3d p2 = p1 + v1 * radius;
		Vector3d p3 = p1 + v1 * (radius + ex_len);

		_p2.Set(p2.x(), p2.y(), p3.z());
		_p3.Set(p3.x(), p3.y(), p3.z());

		_offset = ex_len;
		_angle = ex_angle;
		_dimType = 2;
	}

	void Dim::SetRadius(cad_type p1x, cad_type p1y, cad_type p2x, cad_type p2y, cad_type p3x, cad_type p3y, cad_type ex_len, cad_type ex_angle)
	{
		_p1.Set(p1x, p1y, 0);
		_p2.Set(p2x, p2y, 0);

		double radius = (_p2 - _p1).Length();

		Vector3d p1(_p1._x, _p1._y, _p1._z);
		Vector3d v1(cos(ex_angle), sin(ex_angle), 0);

		Vector3d p2 = p1 + v1 * radius;
		Vector3d p3 = p1 + v1 * (radius + ex_len);

		_p2.Set(p2.x(), p2.y(), p3.z());
		_p3.Set(p3.x(), p3.y(), p3.z());

		_offset = ex_len;
		_angle = ex_angle;
		_dimType = 3;
	}

	void Dim::SetFontSize(double width, double height) {
		_fontWidth = width;
		_fontHeight = height;
	}


	void Dim::SetExtension(double ex_len, double ex_ang) {
		if (_dimType == Dim::DIM_DIAMETER)
		{
			SetDiameter(_p1._x, _p1._y, _p2._x, _p2._y, _p3._x, _p3._y, ex_len, ex_ang);
		}
		else if (_dimType == Dim::DIM_RADIUS)
		{
			SetRadius(_p1._x, _p1._y, _p2._x, _p2._y, _p3._x, _p3._y, ex_len, ex_ang);
		}
	}


	void Dim::SetDimLength(std::shared_ptr<Geom> pGeom, cad_type offset)
	{
		_dimType = Dim::DIM_LENGTH;
		_refID = pGeom->GetID();
		_refType = pGeom->GetType();
		_offset = offset;

		if (pGeom->GetType() == Geom::G_LINE)
		{
			LineSeg* l = (LineSeg*)pGeom.get();
			_p1 = l->_p1;
			_p2 = l->_p2;
		}
		else if (pGeom->GetType() == Geom::G_CIRCLE)
		{
			Circle* c = (Circle*)pGeom.get();
			_p1 = c->_center;
			_p1._x = _p1._x + c->_radius;
			_p2 = c->_center;
			_p2._x = _p2._x + c->_radius;
			_radius = c->_radius;
		}
		else if (pGeom->GetType() == Geom::G_ARC)
		{
			Arc2* a = (Arc2*)pGeom.get();
			_p1 = a->_pt_st;
			_p2 = a->_pt_ed;
			_radius = a->_radius;
		}
	}

	void Dim::SetDimAngle(std::shared_ptr<Geom> pGeom, cad_type offset)
	{
		_dimType = Dim::DIM_ANGLE;
		_refID = pGeom->GetID();
		_refType = pGeom->GetType();
		_offset = offset;

		if (pGeom->GetType() == Geom::G_ARC)
		{
			Arc2* a = (Arc2*)pGeom.get();
			SetAngle(a->_center._x, a->_center._y, a->_pt_st._x, a->_pt_st._y, a->_pt_ed._x, a->_pt_ed._y, offset);

			/*
			_p1 = a->_pt_st;
			_p2 = a->_pt_ed;
			_radius = a->_radius;
			*/
		}
	}

	void Dim::SetDimDiameter(std::shared_ptr<Geom> pGeom, cad_type ex_length, cad_type ex_angle)
	{
		_dimType = Dim::DIM_DIAMETER;
		_refID = pGeom->GetID();
		_refType = pGeom->GetType();
		_offset = ex_length;
		_angle = ex_angle;

		if (pGeom->GetType() == Geom::G_CIRCLE)
		{
			Circle* c = (Circle*)pGeom.get();

			_p1 = c->_center;

			Vector3d p1(_p1._x, _p1._y, _p1._z);
			Vector3d v1(cos(ex_angle), sin(ex_angle), 0);

			Vector3d p2 = p1 + v1 * c->_radius;
			Vector3d p3 = p1 + v1 * (c->_radius + ex_length);

			_p2.Set(p2.x(), p2.y(), p3.z());
			_p3.Set(p3.x(), p3.y(), p3.z());
		}
		else if (pGeom->GetType() == Geom::G_ARC2)
		{
			Arc2* c = (Arc2*)pGeom.get();

			_p1 = c->_center;

			Vector3d p1(_p1._x, _p1._y, _p1._z);
			Vector3d v1(cos(ex_angle), sin(ex_angle), 0);

			Vector3d p2 = p1 + v1 * c->_radius;
			Vector3d p3 = p1 + v1 * (c->_radius + ex_length);

			_p2.Set(p2.x(), p2.y(), p3.z());
			_p3.Set(p3.x(), p3.y(), p3.z());
		}
	}

	void Dim::SetDimRadius(std::shared_ptr<Geom> pGeom, cad_type ex_length, cad_type ex_angle)
	{
		_dimType = Dim::DIM_RADIUS;
		_refID = pGeom->GetID();
		_refType = pGeom->GetType();
		_offset = ex_length;
		_angle = ex_angle;

		if (pGeom->GetType() == Geom::G_CIRCLE)
		{			
			Circle* c = (Circle*)pGeom.get();

			_p1 = c->_center;

			Vector3d p1(_p1._x, _p1._y, _p1._z);
			Vector3d v1(cos(ex_angle), sin(ex_angle),0);

			Vector3d p2 = p1 + v1 * c->_radius;
			Vector3d p3 = p1 + v1 * (c->_radius + ex_length);

			_p2.Set(p2.x(), p2.y(), p3.z());
			_p3.Set(p3.x(), p3.y(), p3.z());
		}
		else if (pGeom->GetType() == Geom::G_ARC2)
		{
			Arc2* c = (Arc2*)pGeom.get();

			_p1 = c->_center;

			Vector3d p1(_p1._x, _p1._y, _p1._z);
			Vector3d v1(cos(ex_angle), sin(ex_angle), 0);

			Vector3d p2 = p1 + v1 * c->_radius;
			Vector3d p3 = p1 + v1 * (c->_radius + ex_length);

			_p2.Set(p2.x(), p2.y(), p3.z());
			_p3.Set(p3.x(), p3.y(), p3.z());
		}
	}

	double Dim::distance2(double x, double y)
	{
		return _preview->distance2(x, y);
	}

	double Dim::distance3(double x, double y, double z) {
		return 10000.0;
	}

	shared_ptr<Geom> Dim::Clone()
	{
		auto cc = std::shared_ptr<Dim>(new Dim());

		cc->_type = _type;
		cc->_id = _id;
		cc->_refID = _refID;
		cc->_refType = _refType;
		cc->_dimType = _dimType;

		cc->_radius = _radius;
		cc->_offset = _offset;
		cc->_angle = _angle;

		cc->_p1 = _p1;
		cc->_p2 = _p2;
		cc->_p3 = _p3;

		cc->_fontWidth = _fontWidth;
		cc->_fontHeight = _fontHeight;

		cc->_message = _message;

		return cc;
	}


	std::string Dim::GetTypeName() {
		return "Dim";
	}

	bool Dim::ToBinary(MemoryBlock* data, int& ptr)
	{
		int size = this->GetBinarySize(true);
		int len = _message.length();
		data->Write4(ptr, &size);
		data->Write2(ptr, &_type);
		data->Write4(ptr, &len);
		for (int i = 0; i < len; i++) {
			data->Write1(ptr, &(_message[i]));
		}
		data->Write8(ptr, &(_p1._x));
		data->Write8(ptr, &(_p1._y));
		data->Write8(ptr, &(_p1._z));
		data->Write8(ptr, &(_p2._x));
		data->Write8(ptr, &(_p2._y));
		data->Write8(ptr, &(_p2._z));
		data->Write8(ptr, &(_p3._x));
		data->Write8(ptr, &(_p3._y));
		data->Write8(ptr, &(_p3._z));
		data->Write8(ptr, &(_radius));
		data->Write8(ptr, &(_fontWidth));
		data->Write8(ptr, &(_fontHeight));
		data->Write8(ptr, &(_offset));
		data->Write8(ptr, &(_angle));
		data->Write4(ptr, &(_refID));
		data->Write4(ptr, &(_refType));
		data->Write4(ptr, &(_dimType));
		
		if (_tag != nullptr) {
			string tag = this->_tag->ToString();
			if (tag != "")
			{
				data->Write(ptr, &(tag[0]), tag.size() + 1);
			}
		}
		return true;
	}

	int Dim::GetBinarySize(bool bIncludeTag)
	{

		int s = _message.length() + 1 + sizeof(short) + sizeof(double) * 12 + sizeof(cad_type) * 2 + sizeof(int) * 3;

		if (bIncludeTag && _tag != nullptr) {
			string tag = this->_tag->ToString();
			if (tag != "")
				return s + tag.size() + 1;
		}
		return s;
	}

	bool Dim::GeneratePreviewDiameter(shared_ptr<Group> preview) {
		Vector3d p1(_p1._x, _p1._y, _p1._z);
		Vector3d p2(_p2._x, _p2._y, _p2._z);
		Vector3d p3(_p3._x, _p3._y, _p3._z);
		Vector3d v1 = p2 - p1;
		Vector3d v2 = p3 - p1;
		Vector3d nv1 = v1;
		nv1.normalize();


		Vector3d p4 = p1 - v1;
		Vector3d p5 = p4 - nv1 * (_fontWidth *3);

		shared_ptr<LineSeg> l1 = make_shared<LineSeg>();
		l1->Set(p5.x(), p5.y(), 0 , p3.x(), p3.y(), 0);
		preview->Add(l1);

		double a1 = Util::Position2Radian(v1.x(), v1.y());

		double length = _fontWidth * 1;
		GeneratePreviewArrow(preview, p2.x(), p2.y(), p2.z(), a1 + M_PI, length);
		GeneratePreviewArrow(preview, p4.x(), p4.y(), p4.z(), a1, length);

		Vector3d txtpos = p3 - Vector3d(cos(a1 - M_PI_2), sin(a1 - M_PI_2), 0) * (0.5);

		//_message = "1234";
		GeneratePreviewText(preview, _message, txtpos.x(), txtpos.y(), txtpos.z(), a1 ,2);

		return true;
	}

	bool Dim::GeneratePreviewRadius(shared_ptr<Group> preview) {

		Vector3d p1(_p1._x, _p1._y, _p1._z);
		Vector3d p2(_p2._x, _p2._y, _p2._z);
		Vector3d p3(_p3._x, _p3._y, _p3._z);


		shared_ptr<LineSeg> l1 = make_shared<LineSeg>();
		l1->Set(_p1, _p3);
		preview->Add(l1);

		Vector3d v1 = p2 - p1;
		double a1 = Util::Position2Radian(v1.x(), v1.y());

		double length = _fontWidth * 1;
		GeneratePreviewArrow(preview, p2.x(), p2.y(), p2.z(), a1 + M_PI, length);

		Vector3d txtpos = p3 - Vector3d(cos(a1-M_PI_2), sin(a1 - M_PI_2), 0) * (0.5);

		//_message = "1234";
		GeneratePreviewText(preview, _message, txtpos.x(), txtpos.y(), txtpos.z(), a1 ,2);

		return true;
	}


	bool Dim::GeneratePreviewAngle(shared_ptr<Group> preview) {

		shared_ptr<Arc2> arc2 = make_shared<Arc2>();

		Vector3d p1(_p1._x, _p1._y, _p1._z);
		Vector3d p2(_p2._x, _p2._y, _p2._z);
		Vector3d p3(_p3._x, _p3._y, _p3._z);

		Vector3d v1 = p2 - p1;
		Vector3d v2 = p3 - p1;
		

		shared_ptr<LineSeg> l1 = make_shared<LineSeg>();
		l1->Set(_p1, _p2);
		preview->Add(l1);

		shared_ptr<LineSeg> l2 = make_shared<LineSeg>();
		l2->Set(_p1, _p3);
		preview->Add(l2);

		double a1 = Util::Position2Radian(v1.x(), v1.y());
		double a2 = Util::Position2Radian(v2.x(), v2.y());

		if (a2 < a1) {
			a2 += M_PI * 2;
		}

		double a3 = (a2+a1)*0.5;

		double radius = _offset;

		Vector3d v2_ = v2.normalized();
		Vector3d p3_ = p1 + v2_ * radius;

		Vector3d v1_ = v1.normalized();
		Vector3d p2_ = p1 + v1_ * radius;

		arc2->Set(_p1._x, _p1._y, _p1._z, radius, _p2._x, _p2._y, _p2._z, _p3._x, _p3._y, _p3._z);

		preview->Add(arc2);

		double length = _fontWidth * 1;
		GeneratePreviewArrow(preview, p2_.x(), p2_.y(), p2_.z(), a1 - M_PI_2, length);
		GeneratePreviewArrow(preview, p3_.x(), p3_.y(), p3_.z(), a2 + M_PI_2, length);

		Vector3d txtpos = p1 + Vector3d(cos(a3), sin(a3), 0) * (radius + length );
		double txtangle = a3 - M_PI_2;

		//_message = "1234";
		GeneratePreviewText(preview, _message, txtpos.x(), txtpos.y(), txtpos.z(), txtangle, 1);

		return true;
	}

	void Dim::GeneratePreviewText(shared_ptr<Group> preview, string msg, double x, double y, double z, double angle, int align) {

		shared_ptr<Group> l4 = make_shared<Group>();
		l4->FontSize(_fontWidth, _fontHeight);
		l4->GenerateString(_message, 0, 0, align);
		l4->SetID(0);
		preview->Add(l4);

		//double angle = Util::Position2Radian(ldir.x(), ldir.y());

		shared_ptr<Matrix4> mat2 = make_shared<Matrix4>();
		mat2->SetRotateAngleAxis(0, 0, 0, angle, 0, 0, 1);
		l4->Transform(mat2);

		shared_ptr<Matrix4> mat3 = make_shared<Matrix4>();
		mat3->SetTranslate(x,y,z);
		l4->Transform(mat3);
	}


	void Dim::GeneratePreviewArrow(shared_ptr<Group> preview, double x, double y, double z, double angle, double length) {
		double ax = length;
		double ay = length/2.5;

		shared_ptr<Matrix4> mat2 = make_shared<Matrix4>();
		mat2->SetRotateAngleAxis(0, 0, 0, angle, 0, 0, 1);

		shared_ptr<Matrix4> mat4 = make_shared<Matrix4>();
		mat4->SetTranslate(x,y,z);

		{
			// arrow1
			shared_ptr<LineSeg> l5 = make_shared<LineSeg>();
			l5->Set(0, 0, 0, -ax, ay, 0);
			l5->SetID(0);
			l5->Transform(mat2);
			l5->Transform(mat4);

			preview->Add(l5);

			shared_ptr<LineSeg> l6 = make_shared<LineSeg>();
			l6->Set(0, 0, 0, -ax, -ay, 0);
			l6->SetID(0);
			l6->Transform(mat2);
			l6->Transform(mat4);

			preview->Add(l6);
		}


	}

	bool Dim::GeneratePreviewLength(shared_ptr<Group> preview) {


		Vector3d p1(_p1._x, _p1._y, _p1._z);
		Vector3d p2(_p2._x, _p2._y, _p2._z);

		Vector3d ldir = p2 - p1;
		ldir.normalize();

		Vector4d ld(ldir.x(), ldir.y(), ldir.z(), 1);

		Eigen::Affine3d rot = Eigen::Affine3d(Eigen::AngleAxisd(M_PI_2, Eigen::Vector3d(0, 0, 1)));

		Vector4d odir = rot * ld;

		Vector3d odir3(odir.x(), odir.y(), odir.z());

		Vector3d p1o = p1 + odir3 * _offset;
		Vector3d p2o = p2 + odir3 * _offset;


		shared_ptr<LineSeg> l1 = make_shared<LineSeg>();
		l1->Set(p1.x(), p1.y(), 0, p1o.x(), p1o.y(), 0);
		l1->SetID(0);
		preview->Add(l1);


		shared_ptr<LineSeg> l2 = make_shared<LineSeg>();
		l2->Set(p2.x(), p2.y(), 0, p2o.x(), p2o.y(), 0);
		l2->SetID(0);
		preview->Add(l2);



		Vector3d p1oo = p1 + odir3 * _offset * 0.8;
		Vector3d p2oo = p2 + odir3 * _offset * 0.8;

		shared_ptr<LineSeg> l3 = make_shared<LineSeg>();
		l3->Set(p1oo.x(), p1oo.y(), 0, p2oo.x(), p2oo.y(), 0);
		l3->SetID(0);
		preview->Add(l3);

		//_message = "1234";

		double length = _fontWidth * 1;

		double angle = 0;
		Vector3d pc;
		if (_offset > 0) {
			angle = Util::Position2Radian(ldir.x(), ldir.y());
			pc = (p1oo + p2oo) * 0.5 + odir3 * length * 0.2;
			GeneratePreviewText(preview, _message, pc.x(), pc.y(), pc.z(), angle, 1);

			GeneratePreviewArrow(preview, p1oo.x(), p1oo.y(), p1oo.z(), angle + M_PI, length);
			GeneratePreviewArrow(preview, p2oo.x(), p2oo.y(), p2oo.z(), angle, length);
		}
		else {
			angle = Util::Position2Radian(ldir.x(), ldir.y()) + M_PI;
			pc = (p1oo + p2oo) * 0.5 - odir3 * length * 0.2;

			GeneratePreviewText(preview, _message, pc.x(), pc.y(), pc.z(), angle, 1);

			GeneratePreviewArrow(preview, p1oo.x(), p1oo.y(), p1oo.z(), angle , length);
			GeneratePreviewArrow(preview, p2oo.x(), p2oo.y(), p2oo.z(), angle + M_PI, length);
		}

		return true;
	}

	bool Dim::GeneratePreview(shared_ptr<Group> preview) {

		_preview->Clear();

		if (_dimType == Dim::DIM_LENGTH)
		{
			GeneratePreviewLength(preview);

			GeneratePreviewLength(_preview);

		}
		if (_dimType == Dim::DIM_ANGLE)
		{
			GeneratePreviewAngle(preview);
			GeneratePreviewAngle(_preview);
		}
		if (_dimType == Dim::DIM_DIAMETER)
		{
			GeneratePreviewDiameter(preview);
			GeneratePreviewDiameter(_preview);
		}
		if (_dimType == Dim::DIM_RADIUS)
		{
			GeneratePreviewRadius(preview);
			GeneratePreviewRadius(_preview);
		}

		return true;
	}

	void Dim::SetMessage(string msg) {
		_message = msg;

	}

	string Dim::GetMessage()
	{
		return _message;
	}

	void Dim::Transform(shared_ptr<Matrix4> mat) {
		Vector4d p1(_p1._x, _p1._y, _p1._z, 1);
		Vector4d p2(_p2._x, _p2._y, _p2._z, 1);
		Vector4d p3(_p3._x, _p3._y, _p3._z, 1);

		Vector4d p1_ = mat->_mat * p1;
		Vector4d p2_ = mat->_mat * p2;
		Vector4d p3_ = mat->_mat * p3;

		_p1.Set(p1_);
		_p2.Set(p2_);
		_p3.Set(p3_);

	}


	void Dim::GetAuxUIPoints(shared_ptr<PointList> plist)
	{
	}

	shared_ptr<BoundingBox2> Dim::GetBoundingBox2()
	{
		return _preview->GetBoundingBox2();
	}

	void Dim::GetIntersection(shared_ptr<Geom> compareGeom, shared_ptr<PointList> plist)
	{
	}
	
	Vector3 Dim::GetPoint(int index)
	{
		if (index == 0)
			return _p1;
		if (index == 1)
			return _p2;
		if (index == 2)
			return _p3;

		return Vector3(0, 0, 0);
	}

	int Dim::GetMessageSize()
	{
		return _message.length();
	}

	int Dim::GetDimType()
	{
		return _dimType;
	}

	double Dim::GetRadius()
	{
		return _radius;
	}

	double Dim::GetOffset()
	{
		return _offset;
	}

	double Dim::GetFontWidth()
	{
		return _fontWidth;
	}

	double Dim::GetFontHeight()
	{
		return _fontHeight;
	}

	double Dim::GetAngle()
	{
		return _angle;
	}


#ifndef _CPP

	EMSCRIPTEN_BINDINGS(raycad_dim) {
		class_<RayCad::Dim, base<Geom>>("Dim")
			.smart_ptr_constructor("Dim", &std::make_shared<Dim>)

			.function("Set", &RayCad::Dim::Set)
			.function("SetLength", &RayCad::Dim::SetLength)
			.function("SetAngle", select_overload<void(cad_type, cad_type, cad_type, cad_type, cad_type, cad_type, cad_type)>(&RayCad::Dim::SetAngle))
			.function("SetAngleElem", select_overload<void(cad_type)>(&RayCad::Dim::SetAngle))
			.function("SetDiameter", &RayCad::Dim::SetDiameter)
			.function("SetRadius", select_overload<void(cad_type, cad_type, cad_type, cad_type, cad_type, cad_type, cad_type, cad_type)>(&RayCad::Dim::SetRadius))
			.function("SetRadiusElem", select_overload<void(cad_type)>(&RayCad::Dim::SetRadius))
			.function("SetDimLength", &RayCad::Dim::SetDimLength)
			.function("SetDimAngle", &RayCad::Dim::SetDimAngle)
			.function("SetDimDiameter", &RayCad::Dim::SetDimDiameter)
			.function("SetDimRadius", &RayCad::Dim::SetDimRadius)

			.function("GetTypeName", &RayCad::Dim::GetTypeName)
			.function("Clone", &RayCad::Dim::Clone)

			.function("distance2", &RayCad::Dim::distance2)
			.function("distance3", &RayCad::Dim::distance3)

			//.function("AddCommand", &RayCad::Dim::AddCommand)

			.function("GeneratePreview", &RayCad::Dim::GeneratePreview)
			.function("GetAuxUIPoints", &RayCad::Dim::GetAuxUIPoints)
	
			.function("GetBoundingBox2", &RayCad::Dim::GetBoundingBox2)
			
			.function("SetMessage", &RayCad::Dim::SetMessage)
			.function("SetFontSize", &RayCad::Dim::SetFontSize)
			.function("SetOffset", &RayCad::Dim::SetOffset)
			.function("SetExtension", &RayCad::Dim::SetExtension)
			.function("GetPoint", &RayCad::Dim::GetPoint)
			.function("GetDimType", &RayCad::Dim::GetDimType)

			.function("SetPoint", &RayCad::Dim::SetPoint)
			.function("SetMsg", &RayCad::Dim::SetMsg)
			.function("SetFont", &RayCad::Dim::SetFont)
			.function("SetOffset", &RayCad::Dim::SetOffset)
			.function("SetRefType", &RayCad::Dim::SetRefType)
			.function("SetDimType", &RayCad::Dim::SetDimType)
			.function("SetRefID", &RayCad::Dim::SetRefID)

			.function("GetPoint", &RayCad::Dim::GetPoint)
			.function("GetMessage", &RayCad::Dim::GetMessage)
			.function("GetMessageSize", &RayCad::Dim::GetMessageSize)
			.function("GetRadius", &RayCad::Dim::GetRadius)
			.function("GetFontWidth", &RayCad::Dim::GetFontWidth)
			.function("GetFontHeight", &RayCad::Dim::GetFontHeight)
			.function("GetOffset", &RayCad::Dim::GetOffset)
			.function("GetAngle", &RayCad::Dim::GetAngle)
			.function("GetRefType", &RayCad::Dim::GetRefType)
			.function("GetDimType", &RayCad::Dim::GetDimType)
			.function("GetRefID", &RayCad::Dim::GetRefID)
			;
	}

#endif
}