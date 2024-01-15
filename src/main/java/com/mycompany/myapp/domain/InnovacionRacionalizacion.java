package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A InnovacionRacionalizacion.
 */
@Entity
@Table(name = "innovacion_racionalizacion")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class InnovacionRacionalizacion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "tematica", nullable = false)
    private String tematica;

    @NotNull
    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;

    @NotNull
    @Column(name = "vp", nullable = false)
    private Integer vp;

    @NotNull
    @Column(name = "autores", nullable = false)
    private String autores;

    @NotNull
    @Column(name = "numero_identidad", nullable = false)
    private Long numeroIdentidad;

    @Lob
    @Column(name = "observacion")
    private String observacion;

    @Column(name = "aprobada")
    private Boolean aprobada;

    @NotNull
    @Column(name = "publico", nullable = false)
    private Boolean publico;

    @ManyToOne
    @JsonIgnoreProperties(value = { "ideas", "innovacionRacionalizacions" }, allowSetters = true)
    private TipoIdea tipoIdea;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public InnovacionRacionalizacion id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTematica() {
        return this.tematica;
    }

    public InnovacionRacionalizacion tematica(String tematica) {
        this.setTematica(tematica);
        return this;
    }

    public void setTematica(String tematica) {
        this.tematica = tematica;
    }

    public LocalDate getFecha() {
        return this.fecha;
    }

    public InnovacionRacionalizacion fecha(LocalDate fecha) {
        this.setFecha(fecha);
        return this;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public Integer getVp() {
        return this.vp;
    }

    public InnovacionRacionalizacion vp(Integer vp) {
        this.setVp(vp);
        return this;
    }

    public void setVp(Integer vp) {
        this.vp = vp;
    }

    public String getAutores() {
        return this.autores;
    }

    public InnovacionRacionalizacion autores(String autores) {
        this.setAutores(autores);
        return this;
    }

    public void setAutores(String autores) {
        this.autores = autores;
    }

    public Long getNumeroIdentidad() {
        return this.numeroIdentidad;
    }

    public InnovacionRacionalizacion numeroIdentidad(Long numeroIdentidad) {
        this.setNumeroIdentidad(numeroIdentidad);
        return this;
    }

    public void setNumeroIdentidad(Long numeroIdentidad) {
        this.numeroIdentidad = numeroIdentidad;
    }

    public String getObservacion() {
        return this.observacion;
    }

    public InnovacionRacionalizacion observacion(String observacion) {
        this.setObservacion(observacion);
        return this;
    }

    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }

    public Boolean getAprobada() {
        return this.aprobada;
    }

    public InnovacionRacionalizacion aprobada(Boolean aprobada) {
        this.setAprobada(aprobada);
        return this;
    }

    public void setAprobada(Boolean aprobada) {
        this.aprobada = aprobada;
    }

    public Boolean getPublico() {
        return this.publico;
    }

    public InnovacionRacionalizacion publico(Boolean publico) {
        this.setPublico(publico);
        return this;
    }

    public void setPublico(Boolean publico) {
        this.publico = publico;
    }

    public TipoIdea getTipoIdea() {
        return this.tipoIdea;
    }

    public void setTipoIdea(TipoIdea tipoIdea) {
        this.tipoIdea = tipoIdea;
    }

    public InnovacionRacionalizacion tipoIdea(TipoIdea tipoIdea) {
        this.setTipoIdea(tipoIdea);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InnovacionRacionalizacion)) {
            return false;
        }
        return id != null && id.equals(((InnovacionRacionalizacion) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InnovacionRacionalizacion{" +
            "id=" + getId() +
            ", tematica='" + getTematica() + "'" +
            ", fecha='" + getFecha() + "'" +
            ", vp=" + getVp() +
            ", autores='" + getAutores() + "'" +
            ", numeroIdentidad=" + getNumeroIdentidad() +
            ", observacion='" + getObservacion() + "'" +
            ", aprobada='" + getAprobada() + "'" +
            ", publico='" + getPublico() + "'" +
            "}";
    }
}
