#include "pch.h"

namespace RayCad
{


	ProteinTrajectory::ProteinTrajectory() {
		_type = Geom::G_PROTEIN_TRAJECTORY;
		_isDna = false;
	}

	void ProteinTrajectory::Init(int size) {
		_points.clear();
		_normal.clear();
		_amino_type="";
		_size = size;

		for (int i = 0; i < size; i++) {
			_points.push_back(0);
			_points.push_back(0);
			_points.push_back(0);

			_normal.push_back(0.1);
			_normal.push_back(0.1);
			_normal.push_back(0.1);

			//_amino_type.push_back(0);
			_amino_type += "C";
		}
	}
	
	void ProteinTrajectory::SetMaxArms(int max_arm) {
		while (_dnaArm.size() < max_arm) {
			vector<int> narm;
			_dnaArm.push_back(narm);
		}
	}


	void ProteinTrajectory::SetDnaArm(int idx, vector<int> arm) {
		SetMaxArms(idx);
		_dnaArm[idx] = arm;
	}

	std::vector<int> ProteinTrajectory::GetDnaArm(int idx) {
		if (_dnaArm.size() <= idx) {
			vector<int> list;
			return list;
		}

		return _dnaArm.at(idx);
	}


	void ProteinTrajectory::Set(int index, Vector3 pos, Vector3 normal, int type) {
		int idx = index * 3;
		_points[idx + 0] = pos._x;
		_points[idx + 1] = pos._y;
		_points[idx + 2] = pos._z;

		_normal[idx + 0] = normal._x;
		_normal[idx + 1] = normal._y;
		_normal[idx + 2] = normal._z;

		_type = type;
	}

	void ProteinTrajectory::SetPoint(int index, cad_type x, cad_type y, cad_type z)
	{
		int idx = index * 3;
		_points[idx + 0] = x;
		_points[idx + 1] = y;
		_points[idx + 2] = z;
	}

	void ProteinTrajectory::SetNormal(int index, cad_type x, cad_type y, cad_type z)
	{
		int idx = index * 3;
		_normal[idx + 0] = x;
		_normal[idx + 1] = y;
		_normal[idx + 2] = z;
	}

	void ProteinTrajectory::SetAminoType(int index, char amino_type)
	{
		_amino_type[index] = amino_type;
	}



	Vector3 ProteinTrajectory::GetPos(int index) {
		int idx = index * 3;
		return Vector3::Create(_points[idx + 0], _points[idx + 1], _points[idx + 2]);
	}

	Vector3 ProteinTrajectory::GetNormal(int index) {
		int idx = index * 3;
		return Vector3::Create(_normal[idx + 0], _normal[idx + 1], _normal[idx + 2]);

	}

	char ProteinTrajectory::GetAminoType(int index)
	{
		if (_amino_type.size() > index)
			return _amino_type.at(index);
		return '\0';
	}


	shared_ptr<Geom> ProteinTrajectory::Clone() {
		auto traj = std::shared_ptr<ProteinTrajectory>(new ProteinTrajectory());
		traj->_id = _id;
		traj->_type = _type;

		int num = _points.size();
		for (int i = 0; i < num; ++i) {
			traj->_points.push_back(_points[i]);
			traj->_normal.push_back(_normal[i]);
		}

		traj->_amino_type = _amino_type;

		return traj;

	}

	string ProteinTrajectory::GetTypeName() {
		return "ProteinTrajectory";
	}

	bool ProteinTrajectory::ToBinary(MemoryBlock* data, int& ptr)
	{
		int size = this->GetBinarySize(true);

		data->Write4(ptr, &size);
		data->Write2(ptr, &_type);
		data->Write4(ptr, &_id);

		data->Write4(ptr, &_size);

		for (int j = 0; j < _size; j++) {
				data->Write8(ptr, &(_points.at(j * 3)));
				data->Write8(ptr, &(_points.at(j * 3 + 1)));
				data->Write8(ptr, &(_points.at(j * 3 + 2)));
		}

		for (int j = 0; j < _size; j++) {
				data->Write8(ptr, &(_normal.at(j * 3)));
				data->Write8(ptr, &(_normal.at(j * 3 + 1)));
				data->Write8(ptr, &(_normal.at(j * 3 + 2)));
		}

		for (int j = 0; j < _size; j++) {
				data->Write1(ptr, &(_amino_type.at(j)));
		}

		data->Write1(ptr, &(_isDna));

		if (_isDna) {
			int dnaArmSize = _size;
			for (int i = 0; i < dnaArmSize; ++i) {
				int subArmSize = _dnaArm.at(i).size();
				data->Write4(ptr, &(subArmSize));
			}
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

	int ProteinTrajectory::GetBinarySize(bool bIncludeTag)
	{
		int size = 0;

		int dnaArmSize = _size;
		size += 4 * dnaArmSize;
		for (int i = 0; i < dnaArmSize; ++i) {
			size += 4 * this->_dnaArm[i].size();
		}

		if (bIncludeTag && _tag != nullptr)
		{
			string tag = this->_tag->ToString();
			if (tag != "") {
				size += 14 + tag.size() + 1 + _size * 49;
				return size;
			}
		}

		size += 14 + 49 * _size;
		return size;
	}

	int ProteinTrajectory::GetNumPoints() {
		return _size;
	}

	bool ProteinTrajectory::IsDNA() {
		return _isDna;
	}



#ifndef _CPP
	EMSCRIPTEN_BINDINGS(raycad_protein_trajectory) {
		class_<ProteinTrajectory, base<Geom>>("ProteinTrajectory")
			.smart_ptr_constructor("ProteinTrajectory", &std::make_shared<ProteinTrajectory>)

			.function("Init", &RayCad::ProteinTrajectory::Init)
			.function("Clone", &RayCad::ProteinTrajectory::Clone)
			.function("GetTypeName", &RayCad::ProteinTrajectory::GetTypeName)
			.function("GetNumPoints", &RayCad::ProteinTrajectory::GetNumPoints)
			.function("GetPos", &RayCad::ProteinTrajectory::GetPos)
			.function("GetNormal", &RayCad::ProteinTrajectory::GetNormal)
			.function("GetAminoType", &RayCad::ProteinTrajectory::GetAminoType)
			.function("SetPoint", &RayCad::ProteinTrajectory::SetPoint)
			.function("SetNormal", &RayCad::ProteinTrajectory::SetNormal)
			.function("SetAminoType", &RayCad::ProteinTrajectory::SetAminoType)
			.function("SetDnaArm", &RayCad::ProteinTrajectory::SetDnaArm)
			.function("GetDnaArm", &RayCad::ProteinTrajectory::GetDnaArm)
			.function("IsDNA", &RayCad::ProteinTrajectory::IsDNA);

		register_vector<int>("vector<int>"); 
	}
#endif
}



