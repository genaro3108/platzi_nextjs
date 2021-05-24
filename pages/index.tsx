import React, { useState, useEffect } from 'react'
import Layout from '@components/Layout/Layout'
import KawaiiHeader from '@components/KawaiiHeader/KawaiiHeader'
import ProductList from '@components/ProductList/ProductList'
import fetch from 'isomorphic-unfetch'


//Server side rendering
//Bajo demanda, siempre va al API
/*export const getServerSideProps = async () => {
  const response = await fetch('http://localhost:3000/api/avo');
  const { data: productList }: TAPIAvoResponse = await response.json()
  return {
    props: {
      productList
    }
  }
}*/

//Static generation, tiene un impacto en el performance
//Solo sucede una vez, en cuanto se genera el paquete de produccion
export const getStaticProps = async () => {
  const response = await fetch('http://localhost:3000/api/avo');
  const { data: productList }: TAPIAvoResponse = await response.json()
  return {
    props: {
      productList
    }
  }
}


const HomePage = ({ productList }: { productList: TProduct[] }) => {

  return (
    <Layout>
      <KawaiiHeader />
      <ProductList products={productList} />
    </Layout>
  )
}

export default HomePage
