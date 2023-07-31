#pragma once
namespace RayCad
{
	/// <summary>
	/// DNA Arm 클래스
	/// </summary>
	class DnaArm : public Geom
	{
	public:

		/// <summary>
		/// dna arm 정보를 저장하는 변수
		/// </summary>
		vector<vector<int>> _arms;

		/// <summary>
		/// 생성자 : 생성된 기하 오브젝트의 타입을 설정한다
		/// </summary>
		DnaArm();

		/// <summary>
		/// max arm의 갯수를 설정한다
		/// </summary>
		/// <param name="max_arm">max arm</param>
		void SetMaxArms(int max_arm);

		/// <summary>
		/// max arm을 반환한다
		/// </summary>
		/// <returns>max arm</returns>
		int GetMaxArms();

		/// <summary>
		/// 인덱스에 해당하는 arm을 설정한다
		/// </summary>
		/// <param name="idx">인덱스</param>
		/// <param name="arm">arm 정보</param>
		void SetArm(int idx, vector<int> arm);

		/// <summary>
		/// 인덱스에 해당하는 arm을 가져온다
		/// </summary>
		/// <param name="idx">인덱스</param>
		/// <returns>arm 정보</returns>
		std::vector<int> GetArm(int idx);

		/// <summary>
		/// 객체를 복제한다
		/// </summary>
		/// <returns>복제된 객체의 포인터</returns>
		virtual shared_ptr<Geom> Clone();

		/// <summary>
		/// 기하 오브젝트의 타입명을 반환한다.
		/// </summary>
		/// <returns>기하 오브젝트 타입명</returns>
		virtual string GetTypeName();

		/// <summary>
		/// 메모리 블럭에 구에 대한 정보를 기입한다
		/// </summary>
		/// <param name="data">구의 정보를 기입할 메모리 블럭</param>
		/// <param name="ptr">기록을 시작할 포인터 위치</param>
		/// <returns>성공 여부</returns>
		virtual bool ToBinary(MemoryBlock* data, int& ptr);


		/// <summary>
		/// 구의 정보를 바이너리로 변환 시 크기를 반환한다 
		/// </summary>
		/// <param name="bIncludeTag">tag 정보 포함 여부</param>
		/// <returns>바이너리 크기</returns>
		virtual int GetBinarySize(bool bIncludeTag = false);


	};


}