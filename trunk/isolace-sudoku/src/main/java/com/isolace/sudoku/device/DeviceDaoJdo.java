package com.isolace.sudoku.device;

import java.util.Collection;
import java.util.Collections;
import java.util.logging.Logger;

import javax.jdo.JDOUserException;
import javax.jdo.PersistenceManager;

import org.springframework.orm.jdo.support.JdoDaoSupport;


public class DeviceDaoJdo extends JdoDaoSupport implements DeviceDao {

    private static final Logger log = Logger.getLogger(DeviceDaoJdo.class.getName());

    public Collection<Device> findAll() {
        Collection<Device> devices;
        PersistenceManager pm = getPersistenceManager();
        String query = "select from " + Device.class.getName();
        log.info(query);
        try {
            devices = (Collection<Device>) pm.newQuery(query).execute();
        } catch (JDOUserException e) {
            devices = Collections.emptyList();
        }

        return devices;
    }

    public Device find(Long id) {
        PersistenceManager pm = getPersistenceManager();
        log.info("getObjectById(" + id + ")");
        Device device = (Device) pm.getObjectById(Device.class, id);
        return device;
    }

    public void persist(Device device) {
        PersistenceManager pm = getPersistenceManager();
        try {
            pm.makePersistent(device);
        } finally {
            pm.close();
        }
    }
    
    public void merge(Device device) {
        PersistenceManager pm = getPersistenceManager();
        try {
            Device u = find(device.getId());
            u.setDeviceId(device.getDeviceId());
        } finally {
            pm.close();
        }
    }

    public void remove(Long id) {
        PersistenceManager pm = getPersistenceManager();
        pm.deletePersistent(find(id));
    }
}
