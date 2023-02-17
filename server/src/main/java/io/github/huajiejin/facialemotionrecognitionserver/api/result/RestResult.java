package io.github.huajiejin.facialemotionrecognitionserver.api.result;

import lombok.Data;

@Data
public class RestResult<T> {
    private T result;

    public static <R> RestResult<R> result(R result) {
        RestResult<R> restResult = new RestResult<>();
        restResult.setResult(result);
        return restResult;
    }
}
