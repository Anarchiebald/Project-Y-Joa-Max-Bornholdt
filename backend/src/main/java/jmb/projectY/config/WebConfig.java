package jmb.projectY.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * Behandelt die Bilder- und Video-Abfragen
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String path = STR."\{System.getProperty("user.dir").replace("\\", "/")}/uploads/";
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations(STR."file:\{path}");
    }
}
