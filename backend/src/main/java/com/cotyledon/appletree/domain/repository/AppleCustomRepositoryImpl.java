package com.cotyledon.appletree.domain.repository;

import com.cotyledon.appletree.domain.dto.AppleListDTO;
import com.cotyledon.appletree.domain.entity.QApple;
import com.cotyledon.appletree.domain.entity.QAppleUser;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Repository
public class AppleCustomRepositoryImpl implements AppleCustomRepository {
    private final JPAQueryFactory queryFactory;

    public AppleCustomRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    public List<AppleListDTO> findByUidWithPaging(String uid, int sort) {
        QApple apple = QApple.apple;
        QAppleUser appleUser = QAppleUser.appleUser;
        List<AppleListDTO> list = new ArrayList<>();

        Date date = new Date();
        long timeInMilliSeconds = date.getTime();
        java.sql.Date now = new java.sql.Date(timeInMilliSeconds);

        int page = 1;
        int size = 1;

        if(sort == 0) { // 오래된 순
            list = queryFactory.select(Projections.constructor(AppleListDTO.class, apple, appleUser))
                    .from(appleUser)
                    .join(appleUser.apple, apple)
                    .fetchJoin()
                    .where(appleUser.uid.eq(uid))
                    .orderBy(apple.createAt.asc())
                    .offset(page)
                    .limit(size)
                    .fetch();
        } else if(sort == 1) { // 최신순
            list = queryFactory.select(Projections.constructor(AppleListDTO.class, apple, appleUser))
                    .from(appleUser)
                    .join(appleUser.apple, apple)
                    .fetchJoin()
                    .where(appleUser.uid.eq(uid))
                    .orderBy(apple.createAt.desc())
                    .offset(page)
                    .limit(size)
                    .fetch();
        } else if(sort == 3) { // 적게 남은 시간 순
            // 현재 날짜를 안지난 사과들만 가져오기
            List<AppleListDTO> lockList = queryFactory.select(Projections.constructor(AppleListDTO.class, apple, appleUser))
                    .from(appleUser)
                    .join(appleUser.apple, apple)
                    .fetchJoin()
                    .where(appleUser.uid.eq(uid).and(apple.unlockAt.gt(now))) // >
                    .orderBy(apple.unlockAt.asc())
                    .offset(page)
                    .limit(size)
                    .fetch();

            // 현재 날짜를 지난 사과들만 가져오기
            List<AppleListDTO> unlockList = queryFactory.select(Projections.constructor(AppleListDTO.class, apple, appleUser))
                    .from(appleUser)
                    .join(appleUser.apple, apple)
                    .fetchJoin()
                    .where(appleUser.uid.eq(uid).and(apple.unlockAt.loe(now))) // <=
                    .orderBy(apple.unlockAt.asc())
                    .offset(page)
                    .limit(size)
                    .fetch();

            list.addAll(lockList);
            list.addAll(unlockList);

        } else { // 많이 남은 시간 순
            // 현재 날짜를 안지난 사과들만 가져오기
            List<AppleListDTO> lockList = queryFactory.select(Projections.constructor(AppleListDTO.class, apple, appleUser))
                    .from(appleUser)
                    .join(appleUser.apple, apple)
                    .fetchJoin()
                    .where(appleUser.uid.eq(uid).and(apple.unlockAt.gt(now)))
                    .orderBy(apple.unlockAt.desc())
                    .offset(page)
                    .limit(size)
                    .fetch();

            // 현재 날짜를 지난 사과들만 가져오기
            List<AppleListDTO> unlockList = queryFactory.select(Projections.constructor(AppleListDTO.class, apple, appleUser))
                    .from(appleUser)
                    .join(appleUser.apple, apple)
                    .fetchJoin()
                    .where(appleUser.uid.eq(uid).and(apple.unlockAt.loe(now)))
                    .orderBy(apple.unlockAt.asc())
                    .offset(page)
                    .limit(size)
                    .fetch();

            list.addAll(lockList);
            list.addAll(unlockList);
        }

        return list;
    }
}
