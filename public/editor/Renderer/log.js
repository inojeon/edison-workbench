

var log_mode = 3;

// type : 0 -> error
// type : 1 -> warning
// type : 2 -> 기타

/**
 * 로그 메시지를 출력한다.
 * @param {Number} type 로그 타입
 * @param {String} message 로그 메시지
 */
export function rayLog(type, message) {
    if (type >= log_mode)
        return;

    console.log(message);
}

/**
 * 로드 모드를 설정한다.
 * @param {Number} mode 로그 모드
 */
export function rayLogSetMode(mode) {
    log_mode = mode;
}