
/**
 * 시간이 오래 걸리는 작업의 중간 과정을 보여주기 위하여 개발한 클래스
 * */
export class Progress {

    /**
     * Progress dialog의 제목과 메시지를 지정한다
     * @param {String} title 제목
     * @param {String} data 메시지
     */
    constructor(title, data) {

        this._data = data;

        // 한 턴에 수행되는 작업을 정의한 함수 포인터
        this.__work = null;

        // 종료시 호출되는 함수 포인터
        this.__terminate = null;

        // 스레드 진행시 표시될 진행 메세지.
        this.__message = null;

        // 스레드 진행시 표시될 진행 다이알로그 타이틀
        this._title = title;

        // 현재 진행상황
        this._progress = 0;
    }

    /**
     * 메시지를 반환한다
     * */
    message() {
        if (this.__message) {
            return this.__message(this);
        }
    }

    /**
     * 스레드 진행 시 표시될 진행 메시지를 설정한다
     * @param {String} f_message 진행 메시지
     */
    setMessageCB(f_message) {
        this.__message = f_message;

    }

    /**
     * 한 턴에 수행되는 작업을 정의한 함수 포인터를 설정한다.
     * @param {Function} f_work 함수 포인터
     */
    setWorkCB(f_work) {
        this.__work = f_work;
    }

    /**
     * 한 턴에 수행되는 작업을 반환한다
     * */
    work() {
        if (this.__work) {
            return this.__work(this);
        }
    }

    /**
     * 종료 시 호출되는 콜백 함수
     * @param {String} f_message 
     */
    setTerminateCB(f_message) {
        // 종료시 호출되는 함수 포인터
        this.__terminate = f_terminate;
    }

    /**
     * 종료
     * */
    terminate() {
        if (this.__terminate) {
            return this.__terminate(this);
        }
    }
};
