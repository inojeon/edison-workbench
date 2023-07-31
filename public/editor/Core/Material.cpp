#include "pch.h"

namespace RayCad {

	/// <summary>
	/// 생성자 : 생성된 기하 오브젝트의 타입을 설정한다
	/// </summary>
	Material::Material() {
		_type = G_MATERIAL;
	}

	/// <summary>
	/// 색상 가져오기
	/// </summary>
	/// <returns>색상 값</returns>
	Vector3 Material::GetColor() {
		return _color;
	}

	/// <summary>
	/// 앰비언트 색상 가져오기
	/// </summary>
	/// <returns>앰비언트 값</returns>
	Vector3 Material::GetAmbientColor() {
		return _ambient;
	}

	/// <summary>
	/// 금속성 가져오기
	/// </summary>
	/// <returns>금속성 값</returns>
	cad_type Material::GetMatal() {
		return _metalness;
	}

	/// <summary>
	/// 이름 가져오기
	/// </summary>
	/// <returns>이름</returns>
	string Material::GetName() {
		return _name;
	}

	/// <summary>
	/// 객체를 복제한다
	/// </summary>
	/// <returns>복제된 객체의 포인터</returns>
	shared_ptr<Geom> Material::Clone() {
		auto cls = std::shared_ptr<Material>(new Material());

		cls->_ambient = _ambient;
		cls->_color = _color;
		cls->_id = _id;
		cls->_name = _name;
		cls->_metalness = _metalness;

		return cls;

	}



	bool Material::ToBinary(MemoryBlock* data, int& ptr)
	{
		int size = this->GetBinarySize(true);

		data->Write4(ptr, &size);
		data->Write2(ptr, &_type);
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

	int Material::GetBinarySize(bool bIncludeTag)
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

	/// <summary>
	/// 프리뷰 렌더링을 할 오브젝트 생성
	/// </summary>
	/// <param name="preview">프리뷰 렌더링 오브젝트를 저장할 변수</param>
	/// <returns>성공 여부</returns>
	bool Material::GeneratePreview(shared_ptr<Group> preview) {
		return false;
	}

	/// <summary>
	/// 기하 오브젝트의 타입명을 반환한다.
	/// </summary>
	/// <returns>기하 오브젝트 타입명</returns>
	std::string Material::GetTypeName() {
		return "Material";
	}

#ifndef _CPP
	EMSCRIPTEN_BINDINGS(raycad_material) {
		class_<RayCad::Material, base<Geom>>("Material")
			.smart_ptr_constructor("Material", &std::make_shared<Material>)

			.function("GetColor", &RayCad::Material::GetColor)
			.function("GetAmbientColor", &RayCad::Material::GetAmbientColor)
			.function("GetMatal", &RayCad::Material::GetMatal)
			.function("GetName", &RayCad::Material::GetName)

			.function("Clone", &RayCad::Material::Clone)
			.function("GeneratePreview", &RayCad::Material::GeneratePreview)

			.function("GetTypeName", &RayCad::Material::GetTypeName)
			.function("GetBinarySize", &RayCad::Material::GetBinarySize)
			;
	}
#endif
}