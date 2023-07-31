#include "pch.h"

namespace RayCad
{


	Group::Group() : Geom() {
		_type = Geom::G_GROUP;
		_tokenSize = 0;
	}


	Group::~Group() {
		_list.clear();
	}


	int Group::Add(shared_ptr <Geom> geom) {
		_list.push_back(geom);

		return _list.size() - 1;
	}


	shared_ptr <Geom> Group::Get(int index) {
		if (index >= _list.size())
			return NULL;
		return _list[index];
	}


	shared_ptr<Geom> Group::Clone() {

		auto cg = std::shared_ptr<Group>(new Group());
		cg->_id = _id;
		cg->_type = _type;

		for (int i = 0; i < _list.size(); ++i)
		{
			auto curGeom = Get(i);
			cg->Add(curGeom->Clone());
		}

		return cg;
	}

	void Group::Clear() {
		_list.clear();
	}



	double Group::distance2(double x, double y) {
		cad_type result = 999999, curDist = 999999;
		for (int i = 0; i < _list.size(); ++i)
		{
			auto curGeom = Get(i);

			try{
				curDist = curGeom->distance2(x, y);
				if (curDist < result)
					result = curDist;
			}
			catch (exception e) {
				continue;
			}
		}

		return result;
	}

	double Group::distance3(double x, double y, double z) {
		cad_type result = 999999, curDist = 999999;
		for (int i = 0; i < _list.size(); ++i)
		{
			auto curGeom = Get(i);

			try {
				curDist = curGeom->distance3(x, y, z);
				if (curDist < result)
					result = curDist;
			}
			catch (exception e) {
				continue;
			}
		}

		return result;
	}

	double Group::distanceToRay(double ox, double oy, double oz, double dx, double dy, double dz) {
		cad_type result = 999999, curDist = 999999;
		for (int i = 0; i < _list.size(); ++i)
		{
			auto curGeom = Get(i);

			try {
				curDist = curGeom->distanceToRay(ox, oy, oz, dx, dy, dz);
				if (curDist < result)
					result = curDist;
			}
			catch (exception e) {
				continue;
			}
		}

		return result;
	}

	void Group::SetTag(string tag) {
		_tag = make_shared<Tag>();
		this->_tag->Set(tag);
		if (this->_tokenSize <= 0)
			this->_tokenSize = 1;
		this->_tokenSize += tag.size();
	}


	std::string Group::GetTypeName(){
		return "Group";
	}



	int Group::GetNumberOfChildren() {
		return _list.size();
	}


	bool Group::ToBinary(MemoryBlock* data, int& ptr)
	{
		int size = this->GetBinarySize(true);
		
		data->Write4(ptr, &size);
		data->Write2(ptr, &_type);
		data->Write4(ptr, &_id);
		data->Write4(ptr, &_tokenSize);

		if (_tokenSize > 0) {
			string tag = this->_tag->ToString();
			if (tag != "")
			{
				data->Write(ptr, &(tag[0]), tag.size() + 1);
			}
		}

		// Group ���� Geom���� ���̳ʸ��� ����Ѵ�.
		int iter = this->_list.size();
		for (int i = 0; i < iter; i++)
			this->_list.at(i)->ToBinary(data, ptr);
		
		// EndGroup ���̳ʸ� write
		shared_ptr<EndGroup> endgroup = make_shared<EndGroup>();
		endgroup->SetID(_id);
		int endGroupSize = endgroup->GetBinarySize();
		data->Write4(ptr, &(endGroupSize));
		data->Write2(ptr, &(endgroup->_type));
		data->Write4(ptr, &_id);

		return true;
	}

	int Group::GetBinarySize(bool bIncludeTag)
	{
		int totalLen = 14;
		if (bIncludeTag && _tag != nullptr) {
			string tag = this->_tag->ToString();
			if (tag != "") {
				totalLen += tag.size() + 1;
			}
		}
		int iter = this->_list.size();
		for (int i = 0; i < iter; i++)
			totalLen += this->_list.at(i)->GetBinarySize(true);

		// endgroup size
		totalLen += 10;

		return totalLen;
	}

	int Group::GetGroupHeaderBinarySize(bool bIncludeTag)
	{
		int totalLen = 14;
		if (bIncludeTag)
		{
			string tag = this->_tag->ToString();
			if(tag != "")
				totalLen += tag.size() + 1;
		}
		return totalLen;
	}


	EndGroup::EndGroup() {
		_type = Geom::G_ENDGROUP;

	}

	std::string EndGroup::GetTypeName() {
		return "EndGroup";
	}



	void Group::GetAuxUIPoints(shared_ptr<PointList> plist) {
		int n = GetNumberOfChildren();
		for (int i = 0; i < n; i++) {
			auto elem = Get(i);
			elem->GetAuxUIPoints(plist);
		}
	}

	void Group::GetIntersectList(shared_ptr<BoundingBox2> bbox, shared_ptr<Group> result)
	{
		int n = _list.size();
		for (int i = 0; i < n; i++) {
			if (bbox->IsIntersect(_list.at(i)->GetBoundingBox2()))
			{
				result->Add(_list.at(i));
			}
		}	
	}

	shared_ptr<BoundingBox2> Group::GetBoundingBox2() {

		int n = _list.size();
		shared_ptr<BoundingBox2> boundingBox2 = make_shared<BoundingBox2>();
		if (n > 0)
			boundingBox2->_notDefined = false;
		for (int i = 0; i < n; i++)
		{
			boundingBox2->Add(_list.at(i)->GetBoundingBox2());
			cout << i << "th : " << _list.at(i)->GetBoundingBox2()->toString() << endl;
		}

		return boundingBox2;
	}


	shared_ptr<Group> Group::Explode()
	{
		shared_ptr<Group> ret = make_shared<Group>();

		int n = GetNumberOfChildren();
		for (int i = 0; i < n; i++) {
			ret->Add(Get(i)->Explode());
		}

		return ret;
	}


	void Group::Transform(shared_ptr<Matrix4> mat)
	{
		int n = GetNumberOfChildren();
		for (int i = 0; i < n; i++) {
			Get(i)->Transform(mat);
		}
	}

	Vector3 Group::GetIntersectionForExtend(Vector3 st_pt, Vector3 dir)
	{
		int n = this->GetNumberOfChildren();
		Vector3 point, min_point;
		double min_dist = 1e9, dist;
		
		for (int i = 0; i < n; ++i) {
			point =	this->Get(i)->GetIntersectionForExtend(st_pt, dir);
			dist = sqrt(pow(st_pt._x - point._x, 2) + pow(st_pt._y - point._y, 2));
			if (dist < min_dist) {
				min_dist = dist;
				min_point = point;
			}
		}

		return min_point;
	}

	void Group::GetIntersectPointList(shared_ptr<PointList> plist)
	{
		GetIntersectionPointList(dynamic_pointer_cast<Group>(shared_from_this()), plist);
	}



	bool Group::GeneratePreview(shared_ptr<Group> preview) {
		int n = _list.size();
		for (int i = 0; i < n; i++) {
			_list.at(i)->GeneratePreview(preview);
		}
		return true;
	}

	void Group::FontSize(double width, double height) {
		FontSetFontSize(width, height);
	}

	void Group::GenerateString(string data, double x, double y, int align) {
		FontInit();
		FontGenerateString(data, x, y, this, align);
	}


	shared_ptr<Geom> Group::FindChild(int id) {

		int n = _list.size();
		for (int i = 0; i < n; i++) {
			shared_ptr<Geom> geom = _list.at(i);
			int type = geom->GetType();

			if (geom->GetID() == id)
				return geom;

			if (type == Geom::geom_type::G_GROUP) { // group

				shared_ptr<Group> group = std::dynamic_pointer_cast<Group>(geom);
				shared_ptr<Geom> found = group->FindChild(id);

				if (found != NULL)
					return found;
			}

		}


		return NULL;
	}


#ifndef _CPP
	EMSCRIPTEN_BINDINGS(raycad_group) {
		class_<RayCad::Group, base<Geom> >("Group")
			.smart_ptr_constructor("Group", &std::make_shared<Group>)
			.function("Add", &RayCad::Group::Add, allow_raw_pointers())
			.function("Get", &RayCad::Group::Get, allow_raw_pointers())
			.function("Clear", &RayCad::Group::Clear)
			.function("GetNumberOfChildren", &RayCad::Group::GetNumberOfChildren)
			.function("distance2", &RayCad::Group::distance2)
			.function("GetTypeName", &RayCad::Group::GetTypeName)
			.function("GetType", &RayCad::Geom::GetType)
			.function("GetMaterial", &RayCad::Geom::GetMaterial)
			.function("GetAuxUIPoints", &RayCad::Geom::GetAuxUIPoints)
			.function("GetBinarySize", &RayCad::Geom::GetBinarySize)
			.function("GetIntersectList", &RayCad::Group::GetIntersectList)
			.function("GetIntersectPointList", &RayCad::Group::GetIntersectPointList)
			.function("Clone", &RayCad::Group::Clone)
			.function("GeneratePreview", &RayCad::Group::GeneratePreview)
			.function("GetBoundingBox2", &RayCad::Group::GetBoundingBox2)

			.function("distance2", &RayCad::Group::distance2)
			.function("distance3", &RayCad::Group::distance3)
			.function("distanceToRay", &RayCad::Group::distanceToRay)

			.function("Explode", &RayCad::Group::Explode)
			.function("Transform", &RayCad::Group::Transform)
			
			.function("FontSize", &RayCad::Group::FontSize)
			.function("GenerateString", &RayCad::Group::GenerateString)
			.function("FindChild", &RayCad::Group::FindChild)
			;
	}

	EMSCRIPTEN_BINDINGS(raycad_endgroup) {
	class_<RayCad::EndGroup, base<Geom> >("EndGroup")
			.smart_ptr_constructor("EndGroup", &std::make_shared<EndGroup>)
			.function("GetTypeName", &RayCad::EndGroup::GetTypeName)
			;
	}
#endif

}
