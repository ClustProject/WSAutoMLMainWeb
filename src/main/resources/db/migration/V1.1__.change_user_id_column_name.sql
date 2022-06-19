-- 20220619: user 테이블의 id 컬럼명을 user_id로 변경

ALTER TABLE user CHANGE ID user_id BIGINT NOT NULL AUTO_INCREMENT;
