import { useForm, useWatch } from 'react-hook-form';
function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();


  const onSubmit = handleSubmit((data) => {
    // aqui se pueden cambiar los datos antes de enviarlos
    // console.log("formulario enviado");

  });

  return (
    <form onSubmit={onSubmit} >
      {/** Nombre */}
      <label htmlFor="nombre">Nombre</label>
      <input type="text" {...register("nombre",
        {
          required: {
            value: true,
            message: "Nombre es requerido"
          },
          minLength: {
            value: 2,
            message: "Nombre debe tener al menos 2 caracteres"
          },
          maxLength: {
            value: 20,
            message: "Nombre debe tener máximo 20 caracteres"
          },
        })}
      />
      {errors.nombre && <span>{errors.nombre.message}</span>}

      {/** correo */}
      <label htmlFor="correo">Correo</label>
      <input type="email" {...register("correo",
        {
          required: {
            value: true,
            message: "Correo es requerido"
          },
          pattern: {
            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            message: "Corre no valido"
          }
        })}
      />
      {errors.correo && <span>{errors.correo.message}</span>}

      {/** password */}
      <label htmlFor="password">Password</label>
      <input type="password" {...register("password",
        {
          required: {
            value: true,
            message: "La contraseña es requerida"
          }
        })}
      />
      {errors.password && <span>{errors.password.message}</span>}
      {/** confirmarPassword */}
      <label htmlFor="">confirmarPassword</label>
      <input type="password" {...register("confirmarPassword",
        {
          required: {
            value: true,
            message: "Confirmar la contraseña es requerida"
          },
          validate: (value) => {
            return value === watch("password") || "No coinciden la constraseña";
          }

        })}
      />
      {errors.confirmarPassword && <span>{errors.confirmarPassword.message}</span>}

      {/** fechaNacimiento */}
      <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
      <input type="date"  {...register("fechaNacimiento",
        {
          required: {
            value: true,
            message: "Fecha de nacimiento es requerida"
          },
          validate: (value) => {
            const fechaNacimiento = new Date(value);
            const fechaActual = new Date();
            const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
            return edad >= 18 || "Debe ser mayor de edad";
          }
        })}
      />
      {errors.fechaNacimiento && <span>Fecha de nacimiento es requerido</span>}
      {/** pais */}
      <label htmlFor="pais"> País</label>
      <select {...register("pais")}>
        <option value="mx">México</option>
        <option value="co"> Colombia</option>
        <option value="ar">Argentina</option>
      </select>

      {watch('pais') == 'ar' && (
        <>
          <input type="text" placeholder='Provincia' {...register('provincia',
            {
              required: {
                value: true,
                message: "La provincia es requerida"
              }
            })} />
          {errors.provincia && <span>{errors.provincia.message}</span>}
        </>


      )

      }

      {/** file */}
      <label htmlFor="foto">Foto</label>
      <input type="file"
        onChange={(e) => {
          console.log(e.target.files[0]);
          setValue('fotoDelUsuario', e.target.files[0].name)
        }}
      />

      {/** terminos */}
      <div className="contenedor_terminos">
        <label htmlFor="terminos"> Acepto términos y condiciones</label>
        <input type="checkbox" {...register("terminos", { required: true })} />
      </div>
      {errors.terminos && <span>Aceptar los terminos es requerido</span>}

      <button type="submit">Enviar</button>
      <pre>
        {JSON.stringify(watch(), null, 2)}
      </pre>
    </form>
  );
}

export default App;
