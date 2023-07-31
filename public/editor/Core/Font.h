#pragma once

namespace RayCad
{
	/// <summary>
	/// 폰트 캐릭터 정의
	/// </summary>
	struct asteroids_char_t
	{
		uint8_t points[8]; // 4 bits x, 4 bits y
	};

#define P(x,y)	((((x) & 0xF) << 4) | (((y) & 0xF) << 0))

#define FONT_UP 0xFE
#define FONT_LAST 0xFF

	/// <summary>
	/// 폰트 초기화
	/// </summary>
	void FontInit();
	
	/// <summary>
	/// 폰트 크기를 지정한다.
	/// </summary>
	/// <param name="width">폰트 폭</param>
	/// <param name="height">폰트 높이</param>
	void FontSetFontSize(double width, double height);
	
	/// <summary>
	/// string 에 대한 폰트 geometry 데이터를 생성한다.
	/// </summary>
	/// <param name="msg">string</param>
	/// <param name="x">x 좌표</param>
	/// <param name="y">y 좌표</param>
	/// <param name="group">Geometry 그룹</param>
	/// <param name="align">정렬 옵션</param>
	void FontGenerateString(string msg, double x, double y, Group* group, int align = 0);

}