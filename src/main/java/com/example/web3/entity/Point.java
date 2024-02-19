package com.example.web3.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "POINT")
public class Point implements Serializable {
    private static final long serialVersionUID = 1L;
    @GenericGenerator(name = "generator", strategy = "increment")
    @Id
    @GeneratedValue(generator = "generator")
    @Column(name = "ID")
    @Setter
    @Getter
    private long id;
    @Column(name = "x")
    @Setter
    @Getter
    private double x;
    @Column(name = "y")
    @Setter
    @Getter
    private double y;
    @Column(name = "r")
    @Setter
    @Getter
    private float r = 1;
    @Column(name = "isHit")
    private boolean isHit;


    public boolean getHit() {
        return isHit;
    }

    public void setHit(Boolean hit) {
        this.isHit = hit;
    }

    @Override
    public String toString() {
        return "<tr>" +
                "<td>" + this.x + "</td>" +
                "<td>" + this.y + "</td>" +
                "<td>" + this.r + "</td>" +
                "<td>" + this.isHit + "</td>" +
                "</tr>";
    }

    public void check() {
        if ((x <= 0 && y <= 0 && (x >= -r || y >= -r)) ||
                (x <= 0 && y >= 0 && (x*x + y*y <= (r/2) * (r/2))) ||
                (x >= 0 && y <= 0 && (y - 2*x >= -r))) {
            isHit = true;
        } else {
            isHit = false;
        }
    }
}
