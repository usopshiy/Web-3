package com.example.web3.db;

import com.example.web3.entity.Point;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.query.Query;


import java.util.List;

public class DBhandler {
    Session session;

    public DBhandler(){
        SessionFactory sessionFactory;
        sessionFactory = new Configuration()
                .configure("./hibernate.cfg.xml")
                .buildSessionFactory();
        session = sessionFactory.openSession();
    }

    public void addPointToDB(Point point){
        session.getTransaction().begin();
        session.persist(point);
        session.getTransaction().commit();
    }

    public List<Point> getPoints(){
        Query query = session.createQuery("FROM Point");
        List<Point> points = query.list();
        return points;
    }

    public void clearPoints(){
        session.getTransaction().begin();
        try {
            Query query = session.createQuery("DELETE FROM Point");
            query.executeUpdate();
            session.getTransaction().commit();
        } catch (Exception e){
            if (session.getTransaction().isActive()){
                session.getTransaction().rollback();
            }
            throw e;
        }
        finally {
            session.clear();
        }
    }
}

