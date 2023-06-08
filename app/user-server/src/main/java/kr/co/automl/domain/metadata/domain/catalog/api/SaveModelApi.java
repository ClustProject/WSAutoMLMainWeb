package kr.co.automl.domain.metadata.domain.catalog.api;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class SaveModelApi {

    @PostMapping("/saveModel")
    public ResponseEntity<String> saveModel(@RequestBody Map<String, String> data) {
        String modelName = data.get("modelName");
        System.out.println("Received modelName: " + modelName);
        return ResponseEntity.ok(modelName);
    }
}