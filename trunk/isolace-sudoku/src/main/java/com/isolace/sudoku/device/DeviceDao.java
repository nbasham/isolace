package com.isolace.sudoku.device;

import java.util.Collection;

public interface DeviceDao {

    Collection<Device> findAll();

    Device find(Long id);

    void persist(Device device);

    public void merge(Device device);

    void remove(Long id);

}
