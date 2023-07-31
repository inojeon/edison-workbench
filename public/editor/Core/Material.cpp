#include "pch.h"

namespace RayCad {

	/// <summary>
	/// ������ : ������ ���� ������Ʈ�� Ÿ���� �����Ѵ�
	/// </summary>
	Material::Material() {
		_type = G_MATERIAL;
	}

	/// <summary>
	/// ���� ��������
	/// </summary>
	/// <returns>���� ��</returns>
	Vector3 Material::GetColor() {
		return _color;
	}

	/// <summary>
	/// �ں��Ʈ ���� ��������
	/// </summary>
	/// <returns>�ں��Ʈ ��</returns>
	Vector3 Material::GetAmbientColor() {
		return _ambient;
	}

	/// <summary>
	/// �ݼӼ� ��������
	/// </summary>
	/// <returns>�ݼӼ� ��</returns>
	cad_type Material::GetMatal() {
		return _metalness;
	}

	/// <summary>
	/// �̸� ��������
	/// </summary>
	/// <returns>�̸�</returns>
	string Material::GetName() {
		return _name;
	}

	/// <summary>
	/// ��ü�� �����Ѵ�
	/// </summary>
	/// <returns>������ ��ü�� ������</returns>
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
	/// ������ �������� �� ������Ʈ ����
	/// </summary>
	/// <param name="preview">������ ������ ������Ʈ�� ������ ����</param>
	/// <returns>���� ����</returns>
	bool Material::GeneratePreview(shared_ptr<Group> preview) {
		return false;
	}

	/// <summary>
	/// ���� ������Ʈ�� Ÿ�Ը��� ��ȯ�Ѵ�.
	/// </summary>
	/// <returns>���� ������Ʈ Ÿ�Ը�</returns>
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