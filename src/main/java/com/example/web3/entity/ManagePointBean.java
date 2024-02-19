package com.example.web3.entity;

import com.example.web3.db.DBhandler;
import jakarta.annotation.ManagedBean;
import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@ManagedBean
@SessionScoped
@Named("managePointBean")
public class ManagePointBean implements Serializable {
    @Getter
    @Setter
    private Point newPoint;

    private final DBhandler data = new DBhandler();

    public List<Point> getPoints(){return data.getPoints();}

    public ManagePointBean(){
        this.newPoint = new Point();
    }

    public void work(){
        newPoint.check();
        data.addPointToDB(newPoint);
        newPoint = new Point();
        setLastR();
    }

    public void clear(){
        data.clearPoints();
    }

    public void setLastR(){
        if(!getPoints().isEmpty())
            newPoint.setR(getPoints().get(0).getR());
    }
}
