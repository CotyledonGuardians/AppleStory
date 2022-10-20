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
import java.util.List;

@Repository
@Slf4j
public class AppleCustomRepository extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public AppleCustomRepository(JPAQueryFactory queryFactory) {
        super(Apple.class);
        this.queryFactory = queryFactory;
    }

    public Page<AppleListDTO> findOpenByUidSort(String uid, int sort, Pageable pageable) { // 깐 사과들 정렬 0,1
        QApple apple = QApple.apple;
        QAppleUser appleUser = QAppleUser.appleUser;
        JPAQuery<AppleListDTO> query = new JPAQuery<>();

        if(sort == 0) { // 오래된 순
            query = queryFactory.select(Projections.constructor(AppleListDTO.class, apple, appleUser))
                    .from(appleUser)
                    .join(appleUser.apple, apple)
                    .where(appleUser.uid.eq(uid).and(appleUser.isOpen.eq(true)))
                    .orderBy(apple.createAt.asc());
        } else { // 최신순
            query = queryFactory.select(Projections.constructor(AppleListDTO.class, apple, appleUser))
                    .from(appleUser)
                    .join(appleUser.apple, apple)
                    .where(appleUser.uid.eq(uid).and(appleUser.isOpen.eq(true)))
                    .orderBy(apple.createAt.desc());
        }

        long totalCount = query.fetchCount();
        List<AppleListDTO> results = getQuerydsl().applyPagination(pageable, query).fetch();
        return new PageImpl<>(results, pageable, totalCount);
    }

    public Page<AppleListDTO> findCloseByUidSort(String uid, int sort, Pageable pageable) { // 안깐 사과들 정렬
        QApple apple = QApple.apple;
        QAppleUser appleUser = QAppleUser.appleUser;
        JPAQuery<AppleListDTO> query = new JPAQuery<>();

        if(sort == 0) { // 오래된 순
            query = queryFactory.select(Projections.constructor(AppleListDTO.class, apple, appleUser))
                    .from(appleUser)
                    .join(appleUser.apple, apple)
                    .where(appleUser.uid.eq(uid).and(appleUser.isOpen.eq(false)))
                    .orderBy(apple.createAt.asc());
        } else if(sort == 1) { // 최신순
            query = queryFactory.select(Projections.constructor(AppleListDTO.class, apple, appleUser))
                    .from(appleUser)
                    .join(appleUser.apple, apple)
                    .where(appleUser.uid.eq(uid).and(appleUser.isOpen.eq(false)))
                    .orderBy(apple.createAt.desc());
        } else if(sort == 2) { // 적게 남은 시간 순
            query = queryFactory.select(Projections.constructor(AppleListDTO.class, apple, appleUser))
                    .from(appleUser)
                    .join(appleUser.apple, apple)
                    .where(appleUser.uid.eq(uid).and(appleUser.isOpen.eq(false))) // >
                    .orderBy(apple.unlockAt.asc());
        } else { // 많이 남은 시간 순
            query = queryFactory.select(Projections.constructor(AppleListDTO.class, apple, appleUser))
                    .from(appleUser)
                    .join(appleUser.apple, apple)
                    .where(appleUser.uid.eq(uid).and(appleUser.isOpen.eq(false)))
                    .orderBy(apple.unlockAt.desc());
        }

        long totalCount = query.fetchCount();
        List<AppleListDTO> results =  getQuerydsl().applyPagination(pageable, query).fetch();
        return new PageImpl<>(results, pageable, totalCount);
    }
}
