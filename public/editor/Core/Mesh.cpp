#include "pch.h"


namespace RayCad {


	Mesh::Mesh() {
		_type = Geom::G_MESH;
		_vertex = NULL;
		_index = NULL;
		_num_vertex = 0;
		_num_tris = 0;
		_num_uv = 0;
	}

	Mesh::~Mesh() {
		Destroy();
	}

	void Mesh::Init(int num_vertex,  int num_tris) {
		_vertex = new cad_type[num_vertex * 3];
		_index = new int[num_tris * 3];

		_num_vertex = num_vertex;
		_num_tris = num_tris;
	}

	void Mesh::CreateNormal() {
		_normal = new cad_type[_num_vertex * 3];
	}

	void Mesh::CreateUV() {
		_uv = new cad_type[_num_vertex * 2];
		_num_uv = _num_vertex;
	}


	void Mesh::Destroy() {
		rc_delete_array(_vertex);
		rc_delete_array(_index);

		_num_vertex = 0;
		_num_tris = 0;
	}

	string Mesh::GetTypeName() {
		return "Mesh";
	}

	void Mesh::SetVertex(int index, cad_type x, cad_type y, cad_type z) {
		int idx = index * 3;
		_vertex[idx + 0] = x;
		_vertex[idx + 1] = y;
		_vertex[idx + 2] = z;
	}

	void Mesh::SetNormal(int index, cad_type x, cad_type y, cad_type z) {
		int idx = index * 3;
		_normal[idx + 0] = x;
		_normal[idx + 1] = y;
		_normal[idx + 2] = z;
	}

	void Mesh::SetUV(int index, cad_type u, cad_type v) {
		int idx = index * 2;
		_uv[idx + 0] = u;
		_uv[idx + 1] = v;
	}

	void Mesh::SetTri(int index, int t1, int t2, int t3) {
		int idx = index * 3;
		_index[idx + 0] = t1;
		_index[idx + 1] = t2;
		_index[idx + 2] = t3;
	}

	cad_type Mesh::GetVertexData(int raw_idx) {
		return _vertex[raw_idx];
	}

	cad_type Mesh::GetUVData(int raw_idx){
		return _uv[raw_idx];
	}

	int Mesh::GetTriIndex(int raw_idx) {
		return _index[raw_idx];
	}

	double Mesh::distance3(double x, double y, double z) {
		return 0;
	}

	shared_ptr<Geom> Mesh::Clone()
	{
		auto cc = std::shared_ptr<Mesh>(new Mesh());
		cc->_id = _id;
		cc->_type = _type;

		return cc;
	}

	bool Mesh::ToBinary(MemoryBlock* data, int& ptr)
	{
		int size = this->GetBinarySize(true);

		data->Write4(ptr, &size);
		data->Write2(ptr, &_type);
		data->Write4(ptr, &_id);

		data->Write4(ptr, &_num_vertex);
		if (_uv)
			data->Write4(ptr, &_num_vertex);
		else {
			int num_uv = 0;
			data->Write4(ptr, &num_uv);
		}
		data->Write4(ptr, &_num_tris);

		for (int i = 0; i < _num_vertex * 3; i++) {
			data->Write8(ptr, &_vertex[i]);
		}
		if (_uv) {
			for (int i = 0; i < _num_vertex * 2; i++) {
				data->Write8(ptr, &_uv[i]);
			}
		}
		for (int i = 0; i < _num_tris * 3; i++) {
			data->Write4(ptr, &_index[i]);
		}

		if (_tag != nullptr) {
			string tag = this->_tag->ToString();
			if (tag != "")
			{
				data->Write(ptr, &(tag[0]), tag.size() + 1);
			}
		}

		return true;
	}

	int Mesh::GetBinarySize(bool bIncludeTag)
	{
		int ret;
		if (_uv)
			ret = 22 + 40 * _num_vertex + 12 * _num_tris;
		else
			ret = 22 + 32 * _num_vertex + 12 * _num_tris;

		if (bIncludeTag && _tag != nullptr)
		{
			string tag = this->_tag->ToString();
			if (tag != "") {
				return ret + tag.size() + 1;
			}
		}
		return ret;

	}

	bool Mesh::GeneratePreview(shared_ptr<Group> preview) {
		return false;
	}


#ifndef _CPP

	EMSCRIPTEN_BINDINGS(raycad_mesh) {
		class_<RayCad::Mesh, base<Geom>>("Mesh")
			.smart_ptr_constructor("Mesh", &std::make_shared<Mesh>)

			.function("Init", &RayCad::Mesh::Init)
			.function("CreateNormal", &RayCad::Mesh::CreateNormal)
			.function("CreateUV", &RayCad::Mesh::CreateUV)
			.function("Destroy", &RayCad::Mesh::Destroy)
			.function("IsUV", &RayCad::Mesh::IsUV)

			.function("SetVertex", &RayCad::Mesh::SetVertex)
			.function("SetNormal", &RayCad::Mesh::SetNormal)
			.function("SetUV", &RayCad::Mesh::SetUV)
			.function("SetTri", &RayCad::Mesh::SetTri)

			.function("GetNumVertex", &RayCad::Mesh::GetNumVertex)
			.function("GetNumTris", &RayCad::Mesh::GetNumTris)
			.function("GetNumUV", &RayCad::Mesh::GetNumUV)
			.function("GetVertexData", &RayCad::Mesh::GetVertexData)
			.function("GetUVData", &RayCad::Mesh::GetUVData)
			.function("GetTriIndex", &RayCad::Mesh::GetTriIndex)

			.function("distance3", &RayCad::Mesh::distance3)
			.function("Clone", &RayCad::Mesh::Clone)
			.function("GetTypeName", &RayCad::Mesh::GetTypeName)
			.function("GeneratePreview", &RayCad::Mesh::GeneratePreview)
			.function("GetBinarySize", &RayCad::Mesh::GetBinarySize)
			;
	}
#endif


}