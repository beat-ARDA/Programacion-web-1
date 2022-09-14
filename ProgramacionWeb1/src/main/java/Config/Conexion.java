/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 * @author e-arduron
 */
public class Conexion {

    private Connection con;
    private String serverName = "localhost";
    private String portNumber = "3306";
    private String databaseName = "mibasedatos";
    private String url = "jdbc:mysql://" + serverName + ":" + portNumber + "/" + databaseName;

    private String username = "root";
    private String password = "1234";

    public Conexion() {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection(url, username, password);
        } catch (ClassNotFoundException | SQLException ex) {
            System.out.print("Error :" + ex);
        }
    }

    public Connection getConnection() {
        return con;
    }
}
