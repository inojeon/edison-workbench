#pragma once

namespace RayCad
{
	/// <summary>
	/// Geometry Tag 클래스
	/// </summary>
	class Tag  {
	public:

		/// <summary>
		/// key, value 형태로 이루어진 tag 데이터
		/// </summary>
		map<string, string> _data;

		/// <summary>
		/// 클래스 생성자
		/// </summary>
		Tag();

		/// <summary>
		/// (key,value) 태그를 추가한다
		/// </summary>
		/// <param name="key">태그의 key 값</param>
		/// <param name="value">태그의 value 값</param>
		void Add(string key, string value);

		/// <summary>
		/// 'key'='value';로 이루어진 data로부터 태그를 추가한다
		/// </summary>
		/// <param name="data">태그 문자열</param>
		void Set(string data);

		/// <summary>
		/// 태그를 복제한다 (아직 완성되지 않음)
		/// </summary>
		/// <returns>태그의 포인터</returns>
		virtual shared_ptr<Tag> Clone();

		/// <summary>
		/// 태그 정보를 문자열로 변환한다
		/// </summary>
		/// <returns>태그 문자열</returns>
		string ToString();
	};
}