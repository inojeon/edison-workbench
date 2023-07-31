#include "pch.h"


namespace RayCad
{
	asteroids_char_t asteroids_font[100];

	bool _fontInited = false;

	void FontInit() {
		if (_fontInited)
			return;

		for (int i = 0; i < 100; i++) {
			asteroids_font[i] = { FONT_LAST };
		}

		_fontInited = true;
		asteroids_font['0' - 0x20] = { P(0,0), P(8,0), P(8,12), P(0,12), P(0,0), P(8,12), FONT_LAST };
		asteroids_font['1' - 0x20] = { P(4,0), P(4,12), P(3,10), FONT_LAST };
		asteroids_font['2' - 0x20] = { P(0,12), P(8,12), P(8,7), P(0,5), P(0,0), P(8,0), FONT_LAST };
		asteroids_font['3' - 0x20] = { P(0,12), P(8,12), P(8,0), P(0,0), FONT_UP, P(0,6), P(8,6), FONT_LAST };
		asteroids_font['4' - 0x20] = { P(0,12), P(0,6), P(8,6), FONT_UP, P(8,12), P(8,0), FONT_LAST };
		asteroids_font['5' - 0x20] = { P(0,0), P(8,0), P(8,6), P(0,7), P(0,12), P(8,12), FONT_LAST };
		asteroids_font['6' - 0x20] = { P(0,12), P(0,0), P(8,0), P(8,5), P(0,7), FONT_LAST };
		asteroids_font['7' - 0x20] = { P(0,12), P(8,12), P(8,6), P(4,0), FONT_LAST };
		asteroids_font['8' - 0x20] = { P(0,0), P(8,0), P(8,12), P(0,12), P(0,0), FONT_UP, P(0,6), P(8,6), };
		asteroids_font['9' - 0x20] = { P(8,0), P(8,12), P(0,12), P(0,7), P(8,5), FONT_LAST };
		asteroids_font[' ' - 0x20] = { FONT_LAST };
		asteroids_font['.' - 0x20] = { P(3,0), P(5,0), P(5,2), P(3,2),P(3,0),FONT_LAST };
		asteroids_font[',' - 0x20] = { P(2,0), P(4,2), FONT_LAST };
		asteroids_font['-' - 0x20] = { P(2,6), P(6,6), FONT_LAST };
		asteroids_font['+' - 0x20] = { P(1,6), P(7,6), FONT_UP, P(4,9), P(4,3), FONT_LAST };
		asteroids_font['!' - 0x20] = { P(4,0), P(3,2), P(5,2), P(4,0), FONT_UP, P(4,4), P(4,12), FONT_LAST };
		asteroids_font['#' - 0x20] = { P(0,4), P(8,4), P(6,2), P(6,10), P(8,8), P(0,8), P(2,10), P(2,2) };
		asteroids_font['^' - 0x20] = { P(2,6), P(4,12), P(6,6), FONT_LAST };
		asteroids_font['=' - 0x20] = { P(1,4), P(7,4), FONT_UP, P(1,8), P(7,8), FONT_LAST };
		asteroids_font['*' - 0x20] = { P(0,0), P(4,12), P(8,0), P(0,8), P(8,8), P(0,0), FONT_LAST };
		asteroids_font['_' - 0x20] = { P(0,0), P(8,0), FONT_LAST };
		asteroids_font['/' - 0x20] = { P(0,0), P(8,12), FONT_LAST };
		asteroids_font['\\' - 0x20] = { P(0,12), P(8,0), FONT_LAST };
		asteroids_font['@' - 0x20] = { P(8,4), P(4,0), P(0,4), P(0,8), P(4,12), P(8,8), P(4,4), P(3,6) };
		asteroids_font['$' - 0x20] = { P(6,2), P(2,6), P(6,10), FONT_UP, P(4,12), P(4,0), FONT_LAST };
		asteroids_font['&' - 0x20] = { P(8,0), P(4,12), P(8,8), P(0,4), P(4,0), P(8,4), FONT_LAST };
		asteroids_font['[' - 0x20] = { P(6,0), P(2,0), P(2,12), P(6,12), FONT_LAST };
		asteroids_font[']' - 0x20] = { P(2,0), P(6,0), P(6,12), P(2,12), FONT_LAST };
		asteroids_font['(' - 0x20] = { P(6,0), P(2,4), P(2,8), P(6,12), FONT_LAST };
		asteroids_font[')' - 0x20] = { P(2,0), P(6,4), P(6,8), P(2,12), FONT_LAST };
		asteroids_font['{' - 0x20] = { P(6,0), P(4,2), P(4,10), P(6,12), FONT_UP, P(2,6), P(4,6), FONT_LAST };
		asteroids_font['}' - 0x20] = { P(4,0), P(6,2), P(6,10), P(4,12), FONT_UP, P(6,6), P(8,6), FONT_LAST };
		asteroids_font['%' - 0x20] = { P(0,0), P(8,12), FONT_UP, P(2,10), P(2,8), FONT_UP, P(6,4), P(6,2) };
		asteroids_font['<' - 0x20] = { P(6,0), P(2,6), P(6,12), FONT_LAST };
		asteroids_font['>' - 0x20] = { P(2,0), P(6,6), P(2,12), FONT_LAST };
		asteroids_font['|' - 0x20] = { P(4,0), P(4,5), FONT_UP, P(4,6), P(4,12), FONT_LAST };
		asteroids_font[':' - 0x20] = { P(4,9), P(4,7), FONT_UP, P(4,5), P(4,3), FONT_LAST };
		asteroids_font[';' - 0x20] = { P(4,9), P(4,7), FONT_UP, P(4,5), P(1,2), FONT_LAST };
		asteroids_font['"' - 0x20] = { P(2,10), P(2,6), FONT_UP, P(6,10), P(6,6), FONT_LAST };
		asteroids_font['\'' - 0x20] = { P(2,6), P(6,10), FONT_LAST };
		asteroids_font['`' - 0x20] = { P(2,10), P(6,6), FONT_LAST };
		asteroids_font['~' - 0x20] = { P(0,4), P(2,8), P(6,4), P(8,8), FONT_LAST };
		asteroids_font['?' - 0x20] = { P(0,8), P(4,12), P(8,8), P(4,4), FONT_UP, P(4,1), P(4,0), FONT_LAST };
		asteroids_font['A' - 0x20] = { P(0,0), P(0,8), P(4,12), P(8,8), P(8,0), FONT_UP, P(0,4), P(8,4) };
		asteroids_font['B' - 0x20] = { P(0,0), P(0,12), P(4,12), P(8,10), P(4,6), P(8,2), P(4,0), P(0,0) };
		asteroids_font['C' - 0x20] = { P(8,0), P(0,0), P(0,12), P(8,12), FONT_LAST };
		asteroids_font['D' - 0x20] = { P(0,0), P(0,12), P(4,12), P(8,8), P(8,4), P(4,0), P(0,0), FONT_LAST };
		asteroids_font['E' - 0x20] = { P(8,0), P(0,0), P(0,12), P(8,12), FONT_UP, P(0,6), P(6,6), FONT_LAST };
		asteroids_font['F' - 0x20] = { P(0,0), P(0,12), P(8,12), FONT_UP, P(0,6), P(6,6), FONT_LAST };
		asteroids_font['G' - 0x20] = { P(6,6), P(8,4), P(8,0), P(0,0), P(0,12), P(8,12), FONT_LAST };
		asteroids_font['H' - 0x20] = { P(0,0), P(0,12), FONT_UP, P(0,6), P(8,6), FONT_UP, P(8,12), P(8,0) };
		asteroids_font['I' - 0x20] = { P(0,0), P(8,0), FONT_UP, P(4,0), P(4,12), FONT_UP, P(0,12), P(8,12) };
		asteroids_font['J' - 0x20] = { P(0,4), P(4,0), P(8,0), P(8,12), FONT_LAST };
		asteroids_font['K' - 0x20] = { P(0,0), P(0,12), FONT_UP, P(8,12), P(0,6), P(6,0), FONT_LAST };
		asteroids_font['L' - 0x20] = { P(8,0), P(0,0), P(0,12), FONT_LAST };
		asteroids_font['M' - 0x20] = { P(0,0), P(0,12), P(4,8), P(8,12), P(8,0), FONT_LAST };
		asteroids_font['N' - 0x20] = { P(0,0), P(0,12), P(8,0), P(8,12), FONT_LAST };
		asteroids_font['O' - 0x20] = { P(0,0), P(0,12), P(8,12), P(8,0), P(0,0), FONT_LAST };
		asteroids_font['P' - 0x20] = { P(0,0), P(0,12), P(8,12), P(8,6), P(0,5), FONT_LAST };
		asteroids_font['Q' - 0x20] = { P(0,0), P(0,12), P(8,12), P(8,4), P(0,0), FONT_UP, P(4,4), P(8,0) };
		asteroids_font['R' - 0x20] = { P(0,0), P(0,12), P(8,12), P(8,6), P(0,5), FONT_UP, P(4,5), P(8,0) };
		asteroids_font['S' - 0x20] = { P(0,2), P(2,0), P(8,0), P(8,5), P(0,7), P(0,12), P(6,12), P(8,10) };
		asteroids_font['T' - 0x20] = { P(0,12), P(8,12), FONT_UP, P(4,12), P(4,0), FONT_LAST };
		asteroids_font['U' - 0x20] = { P(0,12), P(0,2), P(4,0), P(8,2), P(8,12), FONT_LAST };
		asteroids_font['V' - 0x20] = { P(0,12), P(4,0), P(8,12), FONT_LAST };
		asteroids_font['W' - 0x20] = { P(0,12), P(2,0), P(4,4), P(6,0), P(8,12), FONT_LAST };
		asteroids_font['X' - 0x20] = { P(0,0), P(8,12), FONT_UP, P(0,12), P(8,0), FONT_LAST };
		asteroids_font['Y' - 0x20] = { P(0,12), P(4,6), P(8,12), FONT_UP, P(4,6), P(4,0), FONT_LAST };
		asteroids_font['Z' - 0x20] = { P(0,12), P(8,12), P(0,0), P(8,0), FONT_UP, P(2,6), P(6,6), FONT_LAST };
	}


	void GenerateChar(char c, double width, double height, double x, double y, Group* group) {
		asteroids_char_t font = asteroids_font[c - 0x20];

		bool first = true;
		
		float px = 0;
		float py = 0;

		for (int i = 0; font.points[i] != FONT_LAST && i<8; i++) {
			int value = font.points[i];
		
			if (value == FONT_UP) {
				first = true;
				continue;
			}


			float yy = (font.points[i] & 0xf) * (1/16.0) * height;
			float xx = (font.points[i] >> 4) * (1/16.0) * width;

			if (first) {
				px = xx;
				py = yy;
				first = false;
			}
			else {
				shared_ptr<LineSeg> line = make_shared<LineSeg>();
				line->Set(px + x, py+ y, 0, xx+x, yy+y, 0);
				line->SetID(0);
				group->Add(line);

				px = xx;
				py = yy;
			}

		}
	}

	double _fontWidth = 1;
	double _fontHeight = 1;

	void FontSetFontSize(double width, double height) {
		_fontWidth = width;
		_fontHeight = height;
	}

	void FontGenerateString(string msg, double x, double y, Group* group, int align) {

		int len = msg.length();

		double xx = x;
		double yy = y;

		switch (align) {
		case 0: // left;
			break;

		case 1: // center;
			xx = xx - (len / 2) * _fontWidth;
			break;

		case 2: // right;
			xx = xx - len * _fontWidth;
			break;

		}


		for (int i = 0; i < len; i++) {			
			int value = msg[i];

			GenerateChar(value, _fontWidth, _fontHeight, xx, yy, group);
			xx += _fontWidth;
		}

		return ;
	}


}