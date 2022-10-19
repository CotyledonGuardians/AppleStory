package com.cotyledon.appletree.domain.repository;

import com.cotyledon.appletree.domain.dto.AppleListDTO;
import com.cotyledon.appletree.domain.entity.Apple;
import com.cotyledon.appletree.domain.entity.QApple;
import com.cotyledon.appletree.domain.entity.QAppleUser;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Repository
@Slf4j
public class AppleCustomRepository extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public AppleCustomRepository(JPAQueryFactory queryFactory) {
        super(Apple.class);
        this.queryFactory = queryFactory;
        log.debug("확인");
    }

    public Page<AppleListDTO> findByUidWithPaging(String uid, int sort, Pageable pageable) {
        QApple apple = QApple.apple;
        QAppleUser appleUser = QAppleUser.appleUser;

        List<AppleListDTO> list = new ArrayList<>();
        JPAQuery<AppleListDTO> query = new JPAQuery<>();

        Date date = new Date();
        long timeInMilliSeconds = date.getTime();
        java.sql.Date now = new java.sql.Date(timeInMilliSeconds);
        log.debug("확인확인");
        if(sort == 0) { // 오래된 순
            query = queryFactory.select(Projections.constructor(AppleListDTO.class, apple, appleUser))
                    .from(appleUser)
                    .join(appleUser.apple, apple)
                    .where(appleUser.uid.eq(uid))
                    .orderBy(apple.createAt.asc());
        } else if(sort == 1) { // 최신순
            query = queryFactory.select(Projections.constructor(AppleListDTO.class, apple, appleUser))
                    .from(appleUser)
                    .join(appleUser.apple, apple)
                    .where(appleUser.uid.eq(uid))
                    .orderBy(apple.createAt.desc());
        } else if(sort == 2) { // 적게 남은 시간 순
            // 현재 날짜를 안지난 사과들만 가져오기
            List<AppleListDTO> lockList = queryFactory.select(Projections.constructor(AppleListDTO.class, apple, appleUser))
                    .from(appleUser)
                    .join(appleUser.apple, apple)
                    .where(appleUser.uid.eq(uid).and(apple.unlockAt.gt(now))) // >
                    .orderBy(apple.unlockAt.asc())
                    .fetch();

            // 현재 날짜를 지난 사과들만 가져오기
            List<AppleListDTO> unlockList = queryFactory.select(Projections.constructor(AppleListDTO.class, apple, appleUser))
                    .from(appleUser)
                    .join(appleUser.apple, apple)
                    .where(appleUser.uid.eq(uid).and(apple.unlockAt.loe(now))) // <=
                    .orderBy(apple.unlockAt.asc())
                    .fetch();

            list.addAll(lockList);
            list.addAll(unlockList);

        } else { // 많이 남은 시간 순
            // 현재 날짜를 안지난 사과들만 가져오기
            query = queryFactory.select(Projections.constructor(AppleListDTO.class, apple, appleUser))
                    .from(appleUser)
                    .join(appleUser.apple, apple)
                    .where(appleUser.uid.eq(uid).and(apple.unlockAt.gt(now)))
                    .orderBy(apple.unlockAt.desc());

            // 현재 날짜를 지난 사과들만 가져오기
            query = queryFactory.select(Projections.constructor(AppleListDTO.class, apple, appleUser))
                    .from(appleUser)
                    .join(appleUser.apple, apple)
                    .where(appleUser.uid.eq(uid).and(apple.unlockAt.loe(now)))
                    .orderBy(apple.unlockAt.asc());
        }
        long totalCount = query.fetchCount();
        log.debug("query {}", totalCount);
        List<AppleListDTO> results = getQuerydsl().applyPagination(pageable, query).fetch();
        log.debug("list:{}", results);
        return new PageImpl<>(results, pageable, totalCount);
    }
}
