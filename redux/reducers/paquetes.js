const packageReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SELECT_PACKAGE':
            state.id_paquete_turistico = action.data.id;
            state.tipo_paquete = action.data.tipo_paquete;
            return state;
            break;
        default:
            return state
            break;
    }
}

export default packageReducer;