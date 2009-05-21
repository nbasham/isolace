package com.isolace.sudoku.device;

import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/device/**")
public class DeviceController {
    private static final Logger log = Logger.getLogger(DeviceController.class.getName());

    @Autowired
    DeviceDao deviceDao;

    public DeviceController() {
        log.info("love me do");
    }

    @RequestMapping()
    public String list(ModelMap modelMap) {
        log.info("Device list controller");
        modelMap.addAttribute("devices", deviceDao.findAll());
        return "sudoku/device/list";
    }

}
