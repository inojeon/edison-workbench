#include "pch.h"


namespace RayCad
{

	Geom::Geom(){
		_type = Geom::G_GROUP;
		_tag = NULL;
	}

	std::string Geom::GetTypeName() {
		return "Group";
	}


	int Geom::GetType() {
		return _type;
	}


	int Geom::GetID() {
		return _id;
	}


	void Geom::SetID(int id) {
		_id = id;
	}


	double Geom::distance2(double x, double y) {
		return 0;
	}
	

	double Geom::distance3(double x, double y, double z) {
		return 0;
	}

	double Geom::distanceToRay(double ox, double oy, double oz, double dx, double dy, double dz) {
		return 1000000;
	}


	shared_ptr<Geom> Geom::Clone() {
		
		auto cg = std::shared_ptr<Geom>(new Geom());
		cg->_id = _id;
		cg->_type = _type;
		
		return cg;
	}


	void Geom::GetAuxUIPoints(shared_ptr <PointList> plist) {

		return;
	}




	bool Geom::GeneratePreview(shared_ptr<Group> preview) {
		return true;
	}


	void Geom::AddCommand(KRFTextParser* parser, shared_ptr<CommandList> clist) {
		//string cmd = parser->CadGeomToText(shared_from_this());
		//clist->Add(cmd);
	}


	int Geom::GetBinarySize(bool bIncludeTag)
	{
		if (bIncludeTag && _tag != nullptr)
		{
			string tag = this->_tag->ToString();
			if (tag != "") {
				return 10 + tag.size() + 1;
			}
		}
		return 10;
	}



	shared_ptr<Material> Geom::GetMaterial() {
		return _material;
	}


	bool Geom::ToBinary(MemoryBlock* data, int& ptr) {
		int size = this->GetBinarySize(true);
		data->Write4(ptr, &size);
		
		short int type = _type;
		data->Write2(ptr, &type);

		data->Write4(ptr, &_id);

		if (_tag != nullptr) {
			string tag = this->_tag->ToString();
			if (tag != "")
			{
				data->Write(ptr, &(tag[0]), tag.size() + 1);
			}
		}
		return true;
	}


	void Geom::SetTag(string data) {
		_tag = make_shared<Tag>();
		_tag->Set(data);
	}


	string Geom::GetTag(string key) {
		if (_tag == NULL)
			return "";

		return _tag->_data[key];
	}


	shared_ptr<BoundingBox2> Geom::GetBoundingBox2()
	{
		return shared_ptr<BoundingBox2>();
	}

	void Geom::GetIntersection(shared_ptr<Geom> compareGeom, shared_ptr<PointList> plist)
	{
		return;
	}

	bool Geom::IsBoxIntersect(shared_ptr<BoundingBox2> bbox2)
	{
		shared_ptr<Group> group = make_shared<Group>();

		GeneratePreview(group);
		int n = group->GetNumberOfChildren();
		for (int i = 0; i < n; i++) {
			if (group->Get(i)->IsBoxIntersect(bbox2))
				return true;
		}

		return false;
	}

	bool Geom::IsBoxContain(shared_ptr<BoundingBox2> bbox2)
	{
		return bbox2->IsContain(GetBoundingBox2());
	}

	shared_ptr<Group> Geom::Explode()
	{
		return shared_ptr<Group>();
	}

	void Geom::Transform(shared_ptr<Matrix4> mat) {
	
	}

	void Geom::Offset(double value) {

	}

	Vector3 Geom::GetIntersectionForExtend(Vector3 st_pt, Vector3 dir)
	{
		return Vector3();
	}

	shared_ptr<Group> Geom::Trim(shared_ptr<Geom> refGeom, bool bTrimFirst)
	{
		return shared_ptr<Group>();
	}

	void Geom::Extend(shared_ptr<Geom> refGeom) {
	}

	void Geom::Align(double bx1, double by1, double tx1, double ty1, double bx2, double by2, double tx2, double ty2, bool bApplyScale) 
	{
		Vector3 bdir(bx2 - bx1, by2 - by1, 0);
		Vector3 tdir(tx2 - tx1, ty2 - ty1, 0);
		double blen = bdir.Length();
		double tlen = tdir.Length();
		bdir.Normalize();
		tdir.Normalize();

		// calc rotation for align

		double r_rad = acos(bdir.Dot(tdir));
		Vector3 cpbd = bdir.Cross(tdir);
		if (cpbd._z < 0)
			r_rad = -r_rad;

		// calc scale for align
		
		double ascl = 1.0;
		if (blen > 0.01)
		{
			ascl = tlen / blen;
		}

		// base movement transforms
		Matrix4 mToOrigin;
		mToOrigin.SetTranslate(-bx1, -by1, 0);
		Matrix4 mBackToBase;
		mBackToBase.SetTranslate(bx1, by1, 0);

		// align translation
		Matrix4 mAlignTrans;
		mAlignTrans.SetTranslate(tx1 - bx1, ty1 - by1, 0);

		// rotation for align
		Matrix4 mAlignRot;
		mAlignRot.SetRotateAngleAxis(0, 0, 0, r_rad, 0, 0, 1);

		// scale for align
		Matrix4 mAlignScale;
		mAlignScale.SetScale(ascl, ascl, 1);


		shared_ptr<Matrix4> mAlignTr = make_shared<Matrix4>();
		if (bApplyScale)
			mAlignTr->_mat = mBackToBase._mat * mAlignTrans._mat * mAlignRot._mat * mAlignScale._mat * mToOrigin._mat;
		else
			mAlignTr->_mat = mBackToBase._mat * mAlignTrans._mat * mAlignRot._mat * mToOrigin._mat;

		Transform(mAlignTr);
	}

	string Geom::toString()
	{
		return string();
	}


#ifndef _CPP
	EMSCRIPTEN_BINDINGS(raycad_geom) {
		class_<RayCad::Geom>("Geom")
			.smart_ptr_constructor("Geom", &std::make_shared<Geom>)
			.function("GetID", &RayCad::Geom::GetID)
			.function("SetID", &RayCad::Geom::SetID)
			.function("GetTypeName", &RayCad::Geom::GetTypeName)
			.function("GetType", &RayCad::Geom::GetType)
			.function("distance2", &RayCad::Geom::distance2)
			.function("distance3", &RayCad::Geom::distance3)
			.function("distanceToRay", &RayCad::Geom::distanceToRay)
			.function("GetMaterial", &RayCad::Geom::GetMaterial, allow_raw_pointers())
			.function("GetBinarySize", &RayCad::Geom::GetBinarySize)

			.function("IsBoxContain", &RayCad::Geom::IsBoxContain)
			.function("IsBoxIntersect", &RayCad::Geom::IsBoxIntersect)

			.function("GeneratePreview", &RayCad::Geom::GeneratePreview)

			.function("GetTag", &RayCad::Geom::GetTag)
			.function("GetBoundingBox2", &RayCad::Geom::GetBoundingBox2)

			.function("Explode", &RayCad::Geom::Explode)

			.function("Transform", &RayCad::Geom::Transform)

			.function("Offset", &RayCad::Geom::Offset)
			.function("Trim", &RayCad::Geom::Trim)
			.function("Extend", &RayCad::Geom::Extend)
			.function("Align", &RayCad::Geom::Align)

			.function("toString", &RayCad::Geom::toString)
			;
	}
#endif

}
