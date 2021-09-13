package io.github.huajiejin.facialemotionrecognitionserver.api.course;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/course")
@Log4j2
public class CourseController {
    CourseRepository courseRepository;

    @Autowired
    public CourseController(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @PostMapping
    @ResponseBody
    public Course create(@RequestBody CourseCreationForm cf, @RequestParam String name) {
        Course c = new Course();
        c.setName(cf.getName());
        c.setDescription(cf.getDescription());
        c.setPoster(cf.getPoster());
        this.courseRepository.save(c);
        log.info(name);
        return c;
    }

    @GetMapping
    @ResponseBody
    public Iterable<Course> getAll() {
        return this.courseRepository.findAll();
    }
}
