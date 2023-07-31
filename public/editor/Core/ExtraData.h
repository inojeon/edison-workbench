#pragma once

namespace RayCad
{
	/// <summary>
	/// Point Geometry 클래스
	/// </summary>
	class ExtraData : public Geom {
	public:
		
		/// <summary>
		/// point 데이터
		/// </summary>
		string _data;

		/// <summary>
		/// 인코드된 point 데이터
		/// </summary>
		string _encodedData;

		/// <summary>
		/// 생성자 : 생성된 기하 오브젝트의 타입을 설정한다
		/// </summary>
		ExtraData();

		/// <summary>
		/// 데이터를 설정한다
		/// </summary>
		/// <param name="data">data</param>
		void Set(string data);
		
		/// <summary>
		/// 데이터를 반환한다
		/// </summary>
		/// <returns>데이터</returns>
		string Get();

		/// <summary>
		/// 인코드 된 데이터를 반환한다
		/// </summary>
		/// <returns>인코드 된 데이터</returns>
		string GetEncoded();

		/// <summary>
		/// 데이터를 인코드한다
		/// </summary>
		void Encode();

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
		/// 메모리 블럭에 점에 대한 정보를 기입한다
		/// </summary>
		/// <param name="data">점의 정보를 기입할 메모리 블럭</param>
		/// <param name="ptr">기록을 시작할 포인터 위치</param>
		/// <returns>성공 여부</returns>
		virtual bool ToBinary(MemoryBlock* data, int& ptr);
		
		/// <summary>
		/// 점의 정보를 바이너리로 변환 시 크기를 반환한다 
		/// </summary>
		/// <param name="bIncludeTag">tag 정보 포함 여부</param>
		/// <returns>바이너리 크기</returns>
		virtual int GetBinarySize(bool bIncludeTag = false);

		/// <summary>
		/// ExtraData 문자열을 반환한다
		/// </summary>
		/// <returns>ExtraData 문자열</returns>
		virtual string toString();
		
	};
}