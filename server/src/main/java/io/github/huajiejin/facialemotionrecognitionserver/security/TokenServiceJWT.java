package io.github.huajiejin.facialemotionrecognitionserver.security;

import io.jsonwebtoken.CompressionCodec;
import io.jsonwebtoken.CompressionCodecs;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Service
public class TokenServiceJWT implements TokenService{

    static final private Integer expirationMs = 24 * 60 * 60 * 1000;

    static final Key key = Keys.hmacShaKeyFor("test_key_jin.test_key_jin.test_key_jin.test_key_jin.test_key_jin.test_key_jin.test_key_jin.test_key_jin.test_key_jin".getBytes(StandardCharsets.UTF_8));

    @Override
    public String setSubject(String subject) {
        Date now = getNow();
        return Jwts
                .builder()
                .setSubject(subject)
                .setExpiration(new Date(now.getTime() + expirationMs))
                .setIssuedAt(now)
                .signWith(key)
//                .compressWith(CompressionCodecs.GZIP)
                .compact();
    }

    @Override
    public String getSubject(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject();
    }

    private Date getNow() {
        return new Date();
    }

}
