#include "pch.h"

namespace RayCad {

	
	DnaArm::DnaArm() {
		_type = Geom::G_ATOM;
	}


	
	shared_ptr<Geom> DnaArm::Clone()
	{
		auto cc = std::shared_ptr<DnaArm>(new DnaArm());
		cc->_id = _id;
		cc->_type = _type;
		cc->_arms = _arms;

		return cc;
	}

	string DnaArm::GetTypeName() {
		return "DnaArms";
	}

	bool DnaArm::ToBinary(MemoryBlock* data, int& ptr)
	{
		int size = this->GetBinarySize(true);


		if (_tag != nullptr) {
			string tag = this->_tag->ToString();
			if (tag != "")
			{
				data->Write(ptr, &(tag[0]), tag.size() + 1);
			}
		}

		return true;
	}


	int DnaArm::GetBinarySize(bool bIncludeTag)
	{
		int size = 42;

		if (bIncludeTag && _tag != nullptr)
		{
			string tag = this->_tag->ToString();
			if (tag != "")
				return size + tag.size() + 1;
		}
		return size;
	}



	void DnaArm::SetMaxArms(int max_arm) {
		while (_arms.size() < max_arm) {
			vector<int> narm;
			_arms.push_back(narm);
		}
	}

	int DnaArm::GetMaxArms() {
		return _arms.size();
	}

	void DnaArm::SetArm(int idx, vector<int> arm) {
		_arms[idx] = arm;
	}

	std::vector<int> DnaArm::GetArm(int idx) {

		vector<int> ret;
		ret = _arms[idx];
		return ret;
	}


#ifndef _CPP

	EMSCRIPTEN_BINDINGS(raycad_dnaarm) {
		class_<RayCad::DnaArm, base<Geom>>("DnaArm")
			.smart_ptr_constructor("DnaArm", &std::make_shared<DnaArm>)

			.function("Clone", &RayCad::DnaArm::Clone)

			.function("GetTypeName", &RayCad::DnaArm::GetTypeName)
			.function("GeneratePreview", &RayCad::DnaArm::GeneratePreview)
			.function("GetBinarySize", &RayCad::DnaArm::GetBinarySize)

			.function("SetMaxArms", &RayCad::DnaArm::SetMaxArms)
			.function("GetMaxArms", &RayCad::DnaArm::GetMaxArms)
			.function("SetArm", &RayCad::DnaArm::SetArm)
			.function("GetArm", &RayCad::DnaArm::GetArm)

			;
	}

#endif


}