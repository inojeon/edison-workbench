#include "pch.h"

/// <summary>
/// 주어진 문자열을 구분자에 따라 나누기
/// </summary>
/// <param name="s">나누고자 하는 문자열</param>
/// <param name="delim">구분자</param>
/// <returns>문자열의 벡터</returns>
std::vector<std::string> split(const std::string& s, const char delim);

/// <summary>
/// split 함수의 보조 역할
/// </summary>
/// <typeparam name="Out"></typeparam>
/// <param name="s">나누고자 하는 문자열</param>
/// <param name="delim">구분자</param>
/// <param name="result">결과</param>
template<typename Out> void split(const std::string& s, char delim, Out result);