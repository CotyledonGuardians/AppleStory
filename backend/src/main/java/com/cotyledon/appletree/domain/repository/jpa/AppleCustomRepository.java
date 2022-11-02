package com.cotyledon.appletree.domain.repository.jpa;

import com.cotyledon.appletree.domain.dto.AppleListDTO;
import com.cotyledon.appletree.domain.dto.MapAppleListDTO;
import com.cotyledon.appletree.domain.entity.jpa.Apple;
import com.cotyledon.appletree.domain.entity.jpa.QApple;
import com.cotyledon.appletree.domain.entity.jpa.QAppleUser;
import com.querydsl.core.Tuple;
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
import java.util.stream.Collectors;

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
        System.out.println(results);
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
        System.out.println(results);
        return new PageImpl<>(results, pageable, totalCount);
    }

    public List<MapAppleListDTO> findByAppleListLocation(String uid){
        QApple apple = QApple.apple;
        QAppleUser appleUser = QAppleUser.appleUser;

        List<Apple> fetch = queryFactory
                .select(apple)
                .from(apple)
                .innerJoin(appleUser)
                .on(apple.id.eq(appleUser.apple.id))
                .where(appleUser.uid.eq(uid)
                .and(apple.location.isNotNull())).fetch();

        return fetch.stream().map(
                data -> MapAppleListDTO.builder()
                        .id(data.getId())
                        .location(data.getLocation())
                        .title(data.getTitle())
                        .createAt(data.getCreateAt())
                        .unlockAt(data.getUnlockAt())
                        .build()
        ).collect(Collectors.toList());
    }
}
