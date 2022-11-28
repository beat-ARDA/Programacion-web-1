package Model;

/**
 *
 * @author e-arduron
 */
public class Publicacion {

    private int id, idusuarios, eliminada, spoiler, num_comentarios, num_votos;
    private String descripcion, fecha_creacion, imagen, texto, titulo;

    public Publicacion() {
    }

    public Publicacion(int id, int idusuarios, String descripcion, String fecha_creacion, String imagen, String texto, String titulo, int eliminada, int spoiler, int num_comentarios) {
        this.id = id;
        this.idusuarios = idusuarios;
        this.descripcion = descripcion;
        this.fecha_creacion = fecha_creacion;
        this.imagen = imagen;
        this.texto = texto;
        this.titulo = titulo;
        this.eliminada = eliminada;
        this.spoiler = spoiler;
        this.num_comentarios = num_comentarios;
    }

    public Publicacion(int idusuarios, String descripcion, String imagen, String texto, String titulo, int spoiler, int num_comentarios) {
        this.idusuarios = idusuarios;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.texto = texto;
        this.titulo = titulo;
        this.spoiler = spoiler;
        this.num_comentarios = num_comentarios;
    }

    public Publicacion(String descripcion, String imagen, String texto, String titulo, int spoiler) {
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.texto = texto;
        this.titulo = titulo;
        this.spoiler = spoiler;
    }

    public int getNum_comentarios() {
        return num_comentarios;
    }

    public int getNum_votos() {
        return num_votos;
    }

    public Publicacion(int id) {
        this.id = id;
    }

    public Publicacion(int id, int idusuarios) {
        this.id = id;
        this.idusuarios = idusuarios;
    }

    public int getIdUsuarios() {
        return idusuarios;
    }

    public int getId() {
        return id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public String getFecha_creacion() {
        return fecha_creacion;
    }

    public String getImagen() {
        return imagen;
    }

    public String getTexto() {
        return texto;
    }

    public String getTitulo() {
        return titulo;
    }

    public int getEliminada() {
        return eliminada;
    }

    public int getSpoiler() {
        return spoiler;
    }

}
