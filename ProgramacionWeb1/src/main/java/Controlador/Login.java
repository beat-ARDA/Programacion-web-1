package Controlador;

import DAO.UsuarioDAO;
import Model.Usuarios;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.util.HashMap;

/**
 *
 * @author e-arduron
 */
@WebServlet(name = "Login", urlPatterns = {"/Login"})
public class Login extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HashMap resultado = new HashMap();
        HttpSession session;
        UsuarioDAO userDao = new UsuarioDAO();
        String usuario = request.getParameter("usuario");
        String contrasenia = request.getParameter("contraseña");

        Usuarios user = new Usuarios(usuario, contrasenia);

        Usuarios respuestaUsuario = userDao.Log(user);

        if (respuestaUsuario != null) {
            session = request.getSession();
            session.setAttribute("usuario", respuestaUsuario);
            String userName = respuestaUsuario.getUsername();
            resultado.put("resultado", userName);
        } else {
            resultado.put("resultado", false);
        }

        String json = new Gson().toJson(resultado);

        PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();
    }
}
