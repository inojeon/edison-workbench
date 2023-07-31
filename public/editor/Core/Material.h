#pragma once

namespace RayCad
{
	/// <summary>
	/// Material 클래스
	/// </summary>
	class Material : public Geom {
	public:
		// 이곳에 matrix추가. 
		// 태깅 추가. 
		// 

		/// <summary>
		/// Material의 이름
		/// </summary>
		string _name;
		/// <summary>
		/// Material의 색깔
		/// </summary>
		Vector3 _color;
		/// <summary>
		/// Material의 엠비언트 색깔
		/// </summary>
		Vector3 _ambient;
		/// <summary>
		/// 메탈 정도
		/// </summary>
		cad_type _metalness;
		/// <summary>
		/// 표면 거칠기
		/// </summary>
		cad_type _roughness;
		/// <summary>
		/// 
		/// </summary>
		bool _wireframe;


		/// <summary>
		/// 생성자 : 생성된 기하 오브젝트의 타입을 설정한다
		/// </summary>
		Material();

		/// <summary>
		/// Material의 색상을 가져온다
		/// </summary>
		/// <returns>색상 정보</returns>
		Vector3 GetColor();

		/// <summary>
		/// Material의 Ambinent 색상을 가져온다
		/// </summary>
		/// <returns>Ambient 색상 정보</returns>
		Vector3 GetAmbientColor();

		/// <summary>
		/// 메탈 정보를 가져온다
		/// </summary>
		/// <returns>메탈 정도</returns>
		cad_type GetMatal();

		/// <summary>
		/// Material의 이름을 가져온다
		/// </summary>
		/// <returns>이름</returns>
		string GetName();

		/// <summary>
		/// Material 객체를 복제한다
		/// </summary>
		/// <returns>복제된 Material 객체</returns>
		virtual shared_ptr<Geom> Clone();

		/// <summary>
		/// 메모리 블럭에 Material에 대한 정보를 기입한다
		/// </summary>
		/// <param name="data">Material의 정보를 기입할 메모리 블럭</param>
		/// <param name="ptr">기록을 시작할 포인터 위치</param>
		/// <returns>성공 여부</returns>
		virtual bool ToBinary(MemoryBlock* data, int& ptr);

		/// <summary>
		/// Material의 정보를 바이너리로 변환 시 크기를 반환한다 
		/// </summary>
		/// <param name="bIncludeTag">tag 정보 포함 여부</param>
		/// <returns>바이너리 크기</returns>
		virtual int GetBinarySize(bool bIncludeTag = false);

		/// <summary>
		/// 객체의 렌더링 프리뷰 추가
		/// </summary>
		/// <param name="preview">렌더링 프리뷰가 저장될 변수</param>
		/// <returns>성공 여부</returns>
		virtual bool GeneratePreview(shared_ptr<Group> preview);

		/// <summary>
		/// 기하 오브젝트의 타입명을 반환한다.
		/// </summary>
		/// <returns>기하 오브젝트 타입명</returns>
		std::string GetTypeName();
	};
}
